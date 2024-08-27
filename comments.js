// Create web server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const path = require("path");
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Read comments from file
app.get("/api/comments", (req, res) => {
  fs.readFile(path.join(__dirname, "comments.json"), (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Write comments to file
app.post("/api/comments", (req, res) => {
  fs.writeFile(
    path.join(__dirname, "comments.json"),
    JSON.stringify(req.body),
    (err) => {
      if (err) throw err;
      res.send("Write comments to file successfully");
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
