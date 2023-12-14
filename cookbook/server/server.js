// server.js
/***
 * Lze spustit pouze tento soubor, server následně úspěšně poběží na portu 8001 a bude moc přijímat
 *  požadavky na adresu http://localhost:8001/recipes a zobrazovat data z databáze. --EDIT: Not anymore. Zakomentováno.
 */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./script/db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());


// Simulovaná databáze
const databaseData = [
    { name: 'Jídlo 1', description: 'Popis jídla 1', ingredients: [] },
    { name: 'Jídlo 2', description: 'Popis jídla 2', ingredients: [] },
    // Další data z databáze
];

// Endpoint pro získání dat ze souboru na serveru
app.get('/api/getDataFromFile', (req, res) => {
    const fileData = require('./storage/recipes.json');
    res.json(fileData);
});

// Endpoint pro získání dat z databáze (simulace)
app.get('/api/getDataFromDatabase', (req, res) => {
    res.json(databaseData);
});

// Endpoint pro získání dat z databáze - experimentální
app.get('/api/getDataFromDatabase', (req, res) => {
    db.query('SELECT * FROM cookbook_json_to_sql', (err, results) => {
        if (err) {
            console.error('Chyba při čtení z databáze: ', err);
            res.status(500).send('Chyba při čtení z databáze.');
        } else {
            res.json(results);
            console.log('Data: ', results);
        }
    });
});

/* Fungující připojení k DB
app.get('/recipes', (req, res) => {
    db.query('SELECT * FROM cookbook_json_to_sql', (err, results) => {
        if (err) {
            console.error('Chyba při čtení z databáze: ', err);
            res.status(500).send('Chyba při čtení z databáze.');
        } else {
            res.json(results);
            console.log('Data: ', results);
        }
    });
});*/

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});
