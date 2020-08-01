// DEPENDECIES ===================================
const path = require("path");
// Display notes.html while using the GET METHOD
module.exports = function (app) {
  // display notes.html while using the GET METHOD

  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/api/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "../db/db.json"));
  });
};
