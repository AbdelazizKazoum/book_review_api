import express from "express";

const regd_users = express.Router();

export let users = [];

const isValid = (username) => {
  const userExists = users.find((item) => item.username === username);
  if (userExists) return true;

  return false;
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (userExists) {
    } else {
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } else {
    res.status(400).json({ message: "Enter a valid username and password !" });
    return;
  }
});

export default regd_users;
