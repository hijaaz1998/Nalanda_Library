import Book from "../models/BookModel.js";


export const createBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate, genre, numberOfCopies } =
      req.body;

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

export const updateBook = async (req, res) => {
  try {
    const { title, author, ISBN, publicationDate, genre, numberOfCopies } =
      req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

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

export const deleteBook = async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

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
