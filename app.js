import express from "express";
import jwt from "jsonwebtoken";
import session from "express-session";
import general from "./routes/general.js";
import auth_users from "./routes/auth_users.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(
  "/customer",
  session({ secret: "fingerpint", resave: true, saveUninitialized: true })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
    const token = req.session.authorization["accesstoken"];
    jwt.verify(token, "secret", (err, data) => {
      if (!err) {
        req.user = data.user;
        next();
      } else {
        return res.status(403).json({ message: "user not authorized!" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in!" });
  }
});

app.use("/customer", auth_users);
app.use("/", general);

app.get("/", (req, res) => {
  res.send("hello world!!");
});

app.listen(port, () => {
  console.log("server is listening on port ", +port);
});
