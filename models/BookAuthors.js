const { Model, snakeCaseMappers } = require('objection');

class BookAuthors extends Model {
  static get tableName() {
    return 'books_authors';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = BookAuthors;
