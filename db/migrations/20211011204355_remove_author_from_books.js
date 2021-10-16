
const tableName = 'books', columnName = 'author';

exports.up = async function (knex) {
  await knex.schema.table(tableName, function (table) {
    table.dropColumn(columnName);
  });
};

exports.down = async function (knex) {
  await knex.schema.table(tableName, function (table) {
    knex.hasColumn(tableName, columnName).then((exists) => {
      if (exists) table.dropColumn(columnName);
    });
  });
};
