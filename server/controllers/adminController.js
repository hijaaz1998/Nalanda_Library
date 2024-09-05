import Book from "../models/BookModel.js";

// add a new book
export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate, genre, numberOfCopies } =
      req.body;

    // check if the book already exists
    const existingBook = await Book.findOne({ ISBN: ISBN });

    if (existingBook) {
      return res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    // create a new book
    let book = new Book({
      title,
      author,
      ISBN,
      publicationDate,
      genre,
      numberOfCopies,
      availableCopies: numberOfCopies,
    });

    await book.save();

    res.status(201).json({
      success: true,
      message: "book added successfully",
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

// update the book details
export const updateBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate, genre, numberOfCopies } =
      req.body;

    const book = await Book.findById(req.params.id);

    // check if the book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // update the book detail
    book.title = title || book.title;
    book.author = author || book.author;
    book.ISBN = ISBN || book.ISBN;
    book.publicationDate = publicationDate || book.publicationDate;
    book.genre = genre || book.genre;
    book.numberOfCopies = numberOfCopies || book.numberOfCopies;
    book.availableCopies = numberOfCopies || book.availableCopies;

    await book.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
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

// delete a book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    // check if the book exists
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // soft delete the book 
    book.isDeleted = true;

    await book.save();

    res.json({
      success: true,
      message: "Book deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
