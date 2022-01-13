const express = require("express");
const app = express();
const bp = require("body-parser");
const port = 8080;
const cors = require("cors");
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.post("/Login", (req, res) => {
  var userName = req.body.userName;
  var password = req.body.password;
  console.log(userName + " " + password);
  res.send({
    token: "test123",
  });
  res.end();
});

app.get("/test", (req, res) => {
  res.send({ player: "first" });
  res.end();
});
app.listen(port, () => {
  console.log("Server started at port " + port);
});
