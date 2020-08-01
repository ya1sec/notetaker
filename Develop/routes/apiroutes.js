// DEPENDECIES ===================================
const fs = require("fs");
// const path = require("path");
// const { uuid } = require("uuidv4");
module.exports = function (app) {
  // ability to read the file while grabbing the database json file
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, data) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      data = JSON.parse(data);
      res.json(data);
    });
  });
  // POST API ====================================
  app.post("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, database) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      database = JSON.parse(database);
      var newNote = req.body;
      // Proposition: We want each new id to be one greater than the last elements id
      // newNote.id = database.length + 1;
      //If there are no notes, you end up breaking because you can't make a new note id.
      if (database.length === 0) {
        newNote.id = 1;
      } else {
        const lastElementId = database[database.length - 1].id;
        newNote.id = lastElementId + 1;
      }
      database.push(newNote);
      database = JSON.stringify(database);
      fs.writeFile("db/db.json", database, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });
  // setting up for /api/notes post route
  // DELETE API ==================================
  // setting up for /api/notes/:id
  app.delete("/api/notes/:id", function (req, res) {
    const id = parseInt(req.params.id);
    fs.readFile("db/db.json", "utf8", function (err, database) {
      // if there is an error within reading the file, the file will be thrown out by using the throw syntax
      if (err) throw err;
      database = JSON.parse(database);
      //filter keeps everything for which the function in filter returns true.
      var newDatabase = database.filter((note) => {
        return note.id !== id;
      });
      //where filter would go
      // let newDatabase = [];
      // for (var i = 0; i < database.length; i++) {
      //   if (database[i].id !== id) {
      //     newDatabase.push(database[i]);
      //   }
      // }
      newDatabase = JSON.stringify(newDatabase);
      fs.writeFile("db/db.json", newDatabase, function (err) {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
  });
};
