// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./script/db');

const app = express();
const port = 8000;

app.use(bodyParser.json());

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

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
