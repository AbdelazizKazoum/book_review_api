import express from "express";
import books from "./booksdb.js";
let users = [];

const public_users = express.Router();

// register a user
public_users.post("/register", (req, res) => {});

//get list of books
public_users.get("/", (req, res) => {
  const getAllbooks = new Promise((resolve, reject) => {
    resolve(JSON.stringify(books, null, 4));
  });

  getAllbooks
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => {
      return res.status(500).json({ erorr: err });
    });
});

//get book based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  const getBookIsbn = new Promise((resolve, reject) => {
    if (isbn) resolve(books[isbn]);
    else reject("book not found");
  });

  getBookIsbn
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(404).json({ message: "book not found" }));
});

//get the books based on  the author
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author;

  let authorsBooks = [];

  if (author) {
    for (const key in books) {
      if (books[key].author === author) {
        authorsBooks.push(books[key]);
      }
    }

    if (authorsBooks.length > 0) {
      return res.status(200).json({ data: authorsBooks });
    } else {
      return res
        .status(404)
        .json({ message: "We have no book with author : " + author });
    }
  } else {
    return res.status(500).json({ message: "Provide a valid author name !" });
  }
});

//get the book based on the title
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title;

  console.log(title);

  if (title) {
    for (const key in books) {
      if (books[key].title === title) {
        return res.status(200).json({ data: books[key] });
      }
    }
    return res
      .status(404)
      .json({ message: "we have no book with title " + title });
  } else {
    return res.status(500).json({ message: "invalid book title !" });
  }
});

//get reviews based on isbn
public_users.get("/reviews/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const reviews = books[isbn].reviews;
  if (isbn) {
    return res.status(200).json({ data: reviews });
  } else {
    return res.status(400).json({ message: "Enter a valid isbn !" });
  }
});

export default public_users;
