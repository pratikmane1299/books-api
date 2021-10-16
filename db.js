const knex = require('knex');
const { Model } = require('objection');

const knexConfig = require('./knexfile');

const environment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const connection = knex(knexConfig[environment]);

Model.knex(connection);

module.exports = connection
