const Book = require("../models/Book");


// Add Book
exports.createBook = async (req, res, next) => {
  try {

    const { title, author, isbn, genre, publisher, totalCopies } = req.body;

    if (!title || !author || !isbn || !genre || !publisher || !totalCopies) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book
    });

  } catch (error) {
    next(error);
  }
};



// Get All Books
exports.getBooks = async (req, res, next) => {
  try {

    const books = await Book.find();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });

  } catch (error) {
    next(error);
  }
};



// Get Book by ID
exports.getBookById = async (req, res, next) => {
  try {

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    next(error);
  }
};



// Update Book
exports.updateBook = async (req, res, next) => {
  try {

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json(book);

  } catch (error) {
    next(error);
  }
};



// Delete Book
exports.deleteBook = async (req, res, next) => {
  try {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};



// Search Book by Title
exports.searchBook = async (req, res, next) => {
  try {

    const keyword = req.query.title;

    const books = await Book.find({
      title: { $regex: keyword, $options: "i" }
    });

    res.status(200).json({
      success: true,
      data: books
    });

  } catch (error) {
    next(error);
  }
};