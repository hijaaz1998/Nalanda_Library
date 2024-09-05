import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    numberOfCopies: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
    borrowedCount: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema)
export default Book;