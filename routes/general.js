import express from "express";
import books from "./booksdb.js";

const public_users = express.Router();

//get list of books
public_users.get("/", (req, res) => {
  return res.status(200).json(JSON.stringify(books, null, 4));
});

//get book based on ISBN
public_users.get("/isbn/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  if (isbn) {
    return res.status(200).json({ data: books[isbn] });
  } else {
    return res.status(404).json({ message: "book not found" });
  }
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

export default public_users;
