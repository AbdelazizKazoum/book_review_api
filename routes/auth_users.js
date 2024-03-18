import express from "express";
import jwt from "jsonwebtoken";
import books from "./booksdb.js";

const regd_users = express.Router();

export let users = [];

const isValid = (username) => {
  const userExists = users.find((item) => item.username === username);
  if (userExists) return true;

  return false;
};

const authenticatedUser = (username, password) => {
  const userExists = users.find((item) => item.username === username);
  if (userExists) return true;

  return false;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const findUser = users.find((item) => item.username === username);

  if (username && password) {
    if (authenticatedUser(username, password)) {
      const accesstoken = jwt.sign({ user: req.body }, "secret", {
        expiresIn: 60 * 60,
      });

      req.session.authorization = { accesstoken };

      return res.status(200).json({ message: "User successfully loged in " });
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } else {
    res.status(400).json({ message: "Enter a valid username and password !" });
    return;
  }
});

// adding and modifying a book review
regd_users.post("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  let token = req.session.authorization["accesstoken"];

  if (req.user) {
    const username = req.user.username;
    books[isbn].reviews[username] = review;
    return res.status(200).json({ data: books[isbn].reviews });
  }

  return res.status(401).json({ message: "Log in first" });
});

// Delete review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  if (req.user) {
    const username = req.user?.username;
    delete books[isbn].reviews[username];
    return res
      .status(200)
      .json({ message: ` ${username} review has been deleted successfully ` });
  }

  return res.status(401).json({ message: "log in first" });
});

export default regd_users;
