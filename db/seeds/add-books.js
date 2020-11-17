
exports.seed = function(knex) {
  return knex('books').del()
    .then(function () {
      return knex('books').insert([
        {title: 'Book 1', author: 'john doe', price: 21.21},
        {title: 'Book 2', author: 'alice', price: 35.15},
        {title: 'Book 3', author: 'bob', price: 40.02},
        {title: 'Book 4', author: 'john doe', price: 55.21},
        {title: 'Book 5', author: 'alice', price: 91.00},
        {title: 'Book 6', author: 'bob', price: 5.0},
        {title: 'Book 7', author: 'john doe', price: 69.21},
        {title: 'Book 8', author: 'alice', price: 100.50},
        {title: 'Book 9', author: 'bob', price: 90.02},
      ]);
    });
};
