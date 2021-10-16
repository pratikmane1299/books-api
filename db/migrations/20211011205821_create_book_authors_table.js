const booksTable = 'books';
const authorsTable = 'authors';
const booksAuthorsTable = 'books_authors';

exports.up = async function(knex) {

  await knex.schema.createTable(booksAuthorsTable, (table) => {
    table.increments('id').primary();

    table
      .integer('book_id')
      .unsigned()
      .references('id')
      .inTable(booksTable)
      .onDelete('CASCADE')
      .index();

      table
      .integer('author_id')
      .unsigned()
      .references('id')
      .inTable(authorsTable)
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(booksAuthorsTable);
};
