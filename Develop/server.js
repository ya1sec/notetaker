// DEPENDECIES =======================
const express = require("express");
const fs = require("fs");
const path = require("path");
// To initialze the app
const app = express();
const PORT = process.env.PORT || 9001;
// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
// require route file
require("./routes/htmlroutes.js")(app);
require("./routes/apiroutes.js")(app);
// Start the server to begin listening
app.listen(PORT, function () {
  console.log(`app listening at http://localhost:${PORT}`);
});
