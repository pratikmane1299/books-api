const Knex = require('knex');

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async function(knex) {
  await knex.schema.createTable('books', (table) => {
    table.increments().notNullable();
    table.string('title').notNullable();
    table.float('price').notNullable();
    table.string('author').notNullable();
    table.timestamps(false, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('books');
};
