const knex = require('knex');

const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const connection = knex(config);

module.exports = connection;
