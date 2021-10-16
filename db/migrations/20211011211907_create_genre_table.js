const tableName = 'genres';
const booksTable = 'books';

exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments().primary();
    table.string('name').notNullable();
  });

  await knex.schema.alterTable(booksTable, (table) => {
    table
      .integer('genre_id')
      .unsigned()
      .references('id')
      .inTable(tableName)
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTablIfExists(tableName);
};
