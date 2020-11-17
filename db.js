const options = require('./knexfile');

const knex = require('knex');

module.exports = knex((options['development']));
