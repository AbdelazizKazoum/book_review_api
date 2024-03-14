import express from "express";
import books from "./booksdb";

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

export default public_users;
