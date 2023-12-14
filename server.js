const express = require("express");
const app = express();
const PORT = 4999;

//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(mw); // passes mw to everything, protects all our routes

function mw(req, res, next) {
  console.log("HIT THE MIDDLEWARE");
}

//temporary database
const db = [];

// SCHEDULER( milisecond, function)

function cron(ms, fn) {
  async function cb() {
    clearTimeout(timeout);
    await fn();
    timeout = setTimeout(cb, ms);
  }
  let timeout = setTimeout(cb, ms);
  return () => {};
}

function consoleDB() {
  console.log("DB= ", db);
}

cron(1000, consoleDB);
// http://172.0.01/path/aasdasd/asd/asdasd/asd
//specify some routes that request come into when we execute javascript logic
// GET POST PATCH PUT DELETE

//get is a request for information

/*app.get("/", (req, res) => {
  console.log("You have reached the home route: GET");
  res.status(200)
});*/

//post is normally sending information from the client to the server, sends package creating a child resource
app.post("/api/info", (req, res) => {
  const { information } = req.body;
  console.log("THE POSTED MESSAGE WAS ", information);
  db.push(information);
  console.log("DB: ", db);
  res.status(201).json({ yourMessage: information });
});
//sends package, creates or replaces the resource
app.put("/api", (req, res) => {
  const { word, banana } = req.query;
  console.log(word, banana);
  res.sendStatus(200);
});
//delete the target resource
// :id is a path parameter, we let our path know its going to be dynamic
app.delete("/delete/:id/:name", (req, res) => {
  const { id, name } = req.params;
  console.log("what do you want to delete?", id, name);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server hash started on port: ${PORT}`));

// PATCH sends package, updates part of the resource.
