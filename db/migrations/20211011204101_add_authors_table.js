const tableName = 'authors';

exports.up = async function (knex) {
  await knex.schema.createTable(tableName, (table) => {
    table.increments().notNullable().primary();
    table.string('name').notNullable();
    table.timestamps(false, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable(tableName);
};
