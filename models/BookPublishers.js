const { Model, snakeCaseMappers } = require('objection');

class BookPublishers extends Model {
  static get tableName() {
    return 'book_publishers';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = BookPublishers;
