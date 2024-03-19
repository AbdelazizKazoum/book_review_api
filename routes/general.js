import express from "express";
import books from "./booksdb.js";
import { isValid, users } from "./auth_users.js";

const public_users = express.Router();

// register a user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username, password });
      return res.status(201).json({ message: "user created successfully" });
    }

    return res.status(409).json({ message: "user already exists !" });
  }

  return res.status(400).json({ message: "Please provide valid data !" });
});

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
    else reject("Enter a valid isbn");
  });

  getBookIsbn
    .then((result) => res.status(200).json({ data: result }))
    .catch((err) => res.status(404).json({ message: err }));
});

//get the books based on  the author
public_users.get("/author/:author", (req, res) => {
  const author = req.params.author;

  console.log(author);

  let authorsBooks = [];

  //declare Promise
  const getbooksByAuthor = new Promise((resolve, reject) => {
    for (const key in books) {
      if (books[key].author === author) {
        authorsBooks.push(books[key]);
      }
    }
    if (authorsBooks.length > 0) {
      resolve(authorsBooks);
    } else {
      reject("We have no book with author : " + author);
    }
  });

  if (author) {
    // Call Primise
    getbooksByAuthor
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(404).json({ message: err }));
  } else {
    return res.status(500).json({ message: "Provide a valid author name !" });
  }
});

//get the book based on the title
public_users.get("/title/:title", (req, res) => {
  const title = req.params.title;

  // declare Promise
  const getBookByTitle = new Promise((resolve, reject) => {
    for (const key in books) {
      if (books[key].title === title) resolve(books[key]);
      else reject("we have no book with title " + title);
    }
  });

  if (title) {
    //Call the Promise
    getBookByTitle
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => res.status(404).json({ message: err }));
  } else {
    return res.status(500).json({ message: "invalid book title !" });
  }
});

//get reviews based on isbn
public_users.get("/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const reviews = books[isbn].reviews;
  if (isbn) {
    return res.status(200).json({ data: reviews });
  } else {
    return res.status(400).json({ message: "Enter a valid isbn !" });
  }
});

export default public_users;
