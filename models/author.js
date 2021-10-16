const { Model, snakeCaseMappers } = require('objection');

const connection = require('../db');

Model.knex(connection);

const Book = require('./book');

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static relationMappings = {
    books: {
      relation: Model.HasOneThroughRelation,
      modelClass: Book,
      join: {
        from: 'authors.id',
        through: {
          from: 'books_authors.author_id',
          to: 'books_authors.book_id',
        },
        to: 'books.id'
      },
    },
  };
}

module.exports = Author;
