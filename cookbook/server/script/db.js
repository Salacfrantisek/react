const mysql = require('mysql');
// db.js

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cookbook',
    password: 'SilneHeslo1234',
    database: 'localhost',
});

connection.connect((err) => {
    if (err) {
        console.error('Chyba připojení k databázi: ', err);
    } else {
        console.log('Připojení k databázi proběhlo úspěšně.');
    }
});

module.exports = connection;

