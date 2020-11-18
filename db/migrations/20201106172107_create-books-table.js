const Knex = require('knex');

/**
 * 
 * @param {Knex} knex 
 */

exports.up = async function(knex) {
  await knex.schema.createTable('books', (table) => {
    table.increments().notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.float('price').notNullable();
    table.string('author').notNullable();
    table.integer('page_count').notNullable();
    table.string('publisher').notNullable();
    table.string('published_date').notNullable();
    table.timestamps(false, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('books');
};
