import Book from "../models/BookModel.js";
import Borrow from "../models/BorrowModel.js";

// Retrieves the most borrowed books
export const getMostBorrowedBooks = async (req, res) => {
  try {
    const mostBorrowedBooks = await Borrow.aggregate([
      // Group by bookId and count the number of borrows
      { $group: { _id: "$bookId", count: { $sum: 1 } } },
      // Sort by the borrow count in descending order
      { $sort: { count: -1 } },
      // Limit to top 10 most borrowed books
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          bookId: "$_id",
          count: 1,
          title: "$bookDetails.title",
          author: "$bookDetails.author",
          ISBN: "$bookDetails.ISBN",
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: mostBorrowedBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getActiveMembers = async (req, res) => {
  try {
    const activeMembers = await Borrow.aggregate([
      // Group by userId and count the number of borrows
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      // Sort by the borrow count in descending order
      { $sort: { count: -1 } },
      // Limit to top 10 most active members
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          count: 1,
          name: "$userDetails.name",
          email: "$userDetails.email",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: activeMembers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAvailableBooks = async (req, res) => {
  try {
    const [mostBorrowedBooks, totalBooks, availableBooks] = await Promise.all([
      Book.aggregate([
        { $match: { isDeleted: false } },
        { $sort: { borrowedCount: -1 } },
        { $limit: 10 },
        { $project: { title: 1, author: 1, borrowedCount: 1 } },
      ]),
      Book.aggregate([
        { $match: { isDeleted: false } },
        { $count: "totalBooks" },
      ]),
      Book.aggregate([
        { $match: { isDeleted: false } },
        {
          $group: {
            _id: null,
            totalAvailableCopies: { $sum: "$availableCopies" },
          },
        },
        { $project: { _id: 0, totalAvailableCopies: 1 } },
      ]),
    ]);

    res.status(200).json({
      success: true,
      mostBorrowedBooks,
      totalBooks: totalBooks[0]?.totalBooks,
      availableBooks: availableBooks[0]?.totalAvailableCopies
    });
  } catch (err) {
    console.error("Error fetching book statistics", err);
    throw err;
  }
};
