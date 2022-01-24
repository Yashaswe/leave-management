const express = require("express");
const app = express();
const bp = require("body-parser");
const port = 8080;
const cors = require("cors");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

function validateEmail(email) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email) throw new Error("Email is required");
  if (!email.match(mailformat)) throw new Error("Email is invalid");
}

function validatePassword(password) {
  if (!password) throw new Error("Password is required");
}

function validateAuthForm(formData) {
  const { email, password } = formData;
  const errors = {};
  try {
    validateEmail(email);
  } catch (err) {
    errors.email = err.message;
  }
  try {
    validatePassword(password);
  } catch (err) {
    errors.password = err.message;
  }
  return errors;
}

app.post("/Login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  const formData = {
    email: email,
    password: password,
  };

  console.log("formData:", formData);
  const errors = validateAuthForm(formData);
  if (Object.keys(errors).length !== 0) {
    const loginError = errors;
    console.log(loginError);
  } else {
    res.send({
      token: "test123",
    });
  }

  res.end();
});

app.get("/test", (req, res) => {
  res.send({ player: "first" });
  res.end();
});
app.listen(port, () => {
  console.log("Server started at port " + port);
});
