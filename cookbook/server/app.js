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

app.use(cors()) //CORS - Cross Origin Resource Sharing

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
app.get('/recipes-sql', (req, res) => {
  db.query('SELECT * FROM cookbook_json_to_sql', (err, results) => {
    if (err) {
      console.error('Chyba při čtení z databáze: ', err);
      res.status(500).send('Chyba při čtení z databáze.');
    } else {
      res.json(results);
    }
  });
});

// Simulovaná databáze
/*
const databaseData = [
  { name: 'Jídlo 1', description: 'Popis jídla 1', ingredients: [] },
  { name: 'Jídlo 2', description: 'Popis jídla 2', ingredients: [] },
  // Další data z databáze
]; */

// Endpoint pro získání dat ze souboru na serveru
app.get('/api/getDataFromFile', (req, res) => {
  const fileData = require('./storage/recipes.json');
  res.json(fileData);
});

// Endpoint pro získání dat z databáze
app.get('/api/getDataFromDatabase', (req, res) => {
  db.query('SELECT * FROM cookbook_json_to_sql', (err, results) => {
    if (err && !results.isNull()) {
      console.error('Chyba při čtení z databáze: ', err);
      res.status(500).send('Chyba při čtení z databáze.');
    } else {
      res.json(results);
      console.log('Data: ', results);
    }
  });
});