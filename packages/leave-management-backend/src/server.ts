const express = require("express");
const app = express();
const bp = require("body-parser");
const port = 8080;
const cors = require("cors");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

import { validateAuthForm } from "@leave-management/common";

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
