const publishersTable = 'publishers';
const booksTable = 'books';
const bookPublishersTable = 'book_publishers';

exports.up = async function (knex) {
  await knex.schema.createTable(publishersTable, (table) => {
    table.increments().notNullable().primary();
    table.string('name').notNullable();
  });

  await knex.schema.createTable(bookPublishersTable, (table) => {
    table.increments('id').primary();

    table
      .integer('book_id')
      .unsigned()
      .references('id')
      .inTable(booksTable)
      .onDelete('CASCADE')
      .index();

    table
      .integer('publisher_id')
      .unsigned()
      .references('id')
      .inTable(publishersTable)
      .onDelete('CASCADE')
      .index();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists(publishersTable);
  await knex.schema.dropTableIfExists(bookPublishersTable);
};
