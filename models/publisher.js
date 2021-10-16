const { Model, snakeCaseMappers } = require('objection');

// const Book = require('./book');

class Publisher extends Model {
  static get tableName() {
    return 'publishers';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    const Book = require('./book');

    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'publishers.id',
          through: {
            from: 'book_publishers.publisher_id',
            to: 'book_publishers.book_id',
          },
          to: 'books.id'
        },
      },
    };
  }
}

module.exports = Publisher;
