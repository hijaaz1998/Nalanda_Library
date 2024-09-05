import Book from "../models/BookModel.js";
import Borrow from "../models/BorrowModel.js";

export const listBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const { genre, author } = req.query;

    const query = { isDeleted: false };

    if (genre) query.genre = genre;
    if (author) query.author = author;

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findById(bookId);

    if (!book || book.availableCopies < 1 || book.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Book not available",
      });
    }

    const borrow = new Borrow({
      userId: userId,
      bookId: bookId,
    });

    book.availableCopies -= 1;
    book.borrowedCount += 1; 

    await borrow.save();
    await book.save();

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: book,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const returnBook = async (req, res) => {
   try {
     const bookId = req.params.id; // Extract book ID from request parameters
     const userId = req.user.id;   // Extract user ID from authenticated user
 
     // Find the borrow record for the specific book and user
     const borrow = await Borrow.findOne({ bookId: bookId, userId: userId });
 
     // Check if the borrow record exists
     if (!borrow) {
       return res.status(404).json({
         success: false,
         message: "Borrow record not found for this book and user",
       });
     }
 
     // Find the book by its ID
     const book = await Book.findById(bookId);
 
     // Check if the book exists
     if (!book) {
       return res.status(404).json({
         success: false,
         message: "Book not found",
       });
     }
 
     book.availableCopies += 1;
     borrow.returnedDate = Date.now();
 
     await borrow.save();
     await book.save();
 
     res.status(200).json({
       success: true,
       message: "Book returned successfully",
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({
       success: false,
       message: "Internal server error",
     });
   }
 };

export const borrowHistory = async (req, res) => {
   try {
     const userId = req.user.id;
 
     // Find all borrow records for the user, populate book details, and sort by creation date
     const history = await Borrow.find({ userId: userId })
       .populate("bookId")
       .sort({ createdAt: -1 });
 
     res.status(200).json({
       success: true,
       message: "Borrow history retrieved successfully",
       data: history,
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({
       success: false,
       message: "Internal server error",
     });
   }
 };
