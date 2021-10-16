const { Model, snakeCaseMappers } = require('objection');

const connection = require('../db');

Model.knex(connection);

class Genre extends Model {
  static get tableName() {
    return "genres";
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get relationMappings() {
    const Book = require('./Book');
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: 'genres.id',
          to: 'books.genre_id',
        },
      },
    };
  }
}

module.exports = Genre;
