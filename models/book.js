
const { Model, snakeCaseMappers } = require('objection');

const Genre = require('./genre');
const Publisher = require('./publisher');

class Book extends Model {
  static get tableName() {
    return "books";
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    const Author = require('./author');
    return {
      genre: {
        relation: Model.HasOneRelation,
        modelClass: Genre,
        join: {
          from: 'books.genre_id',
          to: 'genres.id',
        },
      },
      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: Author,
        join: {
          from: 'books.id',
          through: {
            from: 'books_authors.book_id',
            to: 'books_authors.author_id'
          },
          to: 'authors.id'
        }
      },
      publishers: {
        relation: Model.ManyToManyRelation,
        modelClass: Publisher,
        join: {
          from: 'books.id',
          through: {
            from: 'book_publishers.book_id',
            to: 'book_publishers.publisher_id'
          },
          to: 'publishers.id'
        }
      }
    };
  }
}

module.exports = Book;
