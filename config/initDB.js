require('dotenv').config("../.env");
const Client = require("pg").Client;

const client = new Client({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

client.connect().then(() => {
    client.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME};`).then(() => {
        console.log("Database already exists! Deleting DB!");

        client.query(`CREATE DATABASE ${process.env.DB_NAME};`).then(() => {
            console.log("Database initialised!");
            client.end();
        });
    });
}).catch((err) => {
    console.error("Error occured while initialising DB\n", err);
    client.end();
});
