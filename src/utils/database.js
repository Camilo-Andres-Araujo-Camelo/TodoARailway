const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para poder usar las variables de entorno

const db = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    host: process.env.DB_HOST, //127.0.0.1
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    logging: false // no hacer console.log de información de autenticación, etc.
});

module.exports = db;