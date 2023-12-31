const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const session = require("express-session");
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
