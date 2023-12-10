//načtení modulu express
const express = require("express");
const cors = require("cors");
const path = require('path');
//načtení modulu mysql, bude vyuzivat take express
const bodyParser = require('body-parser');
const db = require('./script/db');

const recipeRouter = require("./controller/recipe-controller");
const ingredientRouter = require("./controller/ingredient-controller");



//inicializace nového Express.js serveru
const app = express();
//definování portu, na kterém má aplikace běžet na localhostu
const port = process.env.PORT || 8000;

// Parsování body
app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors())

//jednoduchá definice routy s HTTP metodou GET, která pouze navrací text
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/recipe", recipeRouter);
app.use("/ingredient", ingredientRouter);
app.use('/storage', express.static(path.join(__dirname, 'storage')));

/*app.get("/*", (req, res) => {
  res.send("Unknown path!");
});*/

//nastavení portu, na kterém má běžet HTTP server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.use(bodyParser.json());

//Čtení receptů z databáze
app.get('/recipes', (req, res) => {
  db.query('SELECT * FROM cookbook_json_to_sql', (err, results) => {
    if (err) {
      console.error('Chyba při čtení z databáze: ', err);
      res.status(500).send('Chyba při čtení z databáze.');
    } else {
      res.json(results);
    }
  });
});