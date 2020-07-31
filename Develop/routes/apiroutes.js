// DEPENDECIES ===================================
const fs = require("fs");
const path = require("path");
module.exports = function (app) {
  // ============================
  let notesData = [];
  app.get("/api/notes", function (err, res) {
    try {
      // reads the notes from json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log("aaaa");
      // parse it so notesData is an array of objects
      notesData = JSON.parse(notesData);

      // error handling
    } catch (err) {
      console.log(err);
    }
    //   send objects to the browser
    res.json(notesData);
  });

  // writes the new note to the json file
  app.post("/api/notes", function (req, res) {
    try {
      // reads the json file
      notesData = fs.readFileSync("./db/db.json", "utf8");
      console.log(notesData);

      // parse the data to get an array of objects
      notesData = JSON.parse(notesData);
      // Set new notes id
      req.body.id = notesData.length;
      // add the new note to the array of note objects
      notesData.push(req.body); // req.body - user input
      // make it string(stringify)so you can write it to the file
      notesData = JSON.stringify(notesData);
      // writes the new note to file
      fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
        // error handling
        if (err) throw err;
      });
      // changeit back to an array of objects & send it back to the browser(client)
      res.json(JSON.parse(notesData));

      // error Handling
    } catch (err) {
      throw err;
      console.log(err);
    }

    app.delete("/api/notes/:id", function (req, res) {
      try {
        //  reads the json file
        notesData = fs.readFileSync("./db/db.json", "utf8");
        // parse the data to get an array of the objects
        notesData = JSON.parse(notesData);
        // delete the old note from the array on note objects
        notesData = notesData.filter(function (note) {
          return note.id != req.params.id;
        });
        // make it string(stringify)so you can write it to the file
        notesData = JSON.stringify(notesData);
        // write the new notes to the file
        fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
          // error handling
          if (err) throw err;
        });

        // change it back to an array of objects & send it back to the browser (client)
        res.send(JSON.parse(notesData));

        // error handling
      } catch (err) {
        throw err;
        console.log(err);
      }
    });
  });

  // ability to read the file while grabbing the database json file
  // fs.readFile("./db/db.json", "utf8", (err, data) => {
  //   // if there is an error within reading the file, the file will be thrown out by using the throw syntax
  //   if (err) throw err;
  //   // calling the data parameter in the readFile
  //   const note = JSON.parse(data);
  //   let notesData = [];
  //   // API ROUTES =================================
  //   // GET API ====================================
  //   // setting up for /api/notes get route
  //   app.get("/api/notes", function (req, res) {
  //     res.json(note);
  //   });
  //   // POST API ====================================
  //   app.post("/api/notes", function (req, res) {
  //     var newNote = req.body;

  //     console.log(newNote);

  //     note.push(newNote);

  //     res.json(newNote);
  //   });
  //   // setting up for /api/notes post route
  //   // DELETE API ==================================
  //   // setting up for /api/notes/:id
  // });
};
