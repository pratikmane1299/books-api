const books = [
  {
    title: 'THE GANGSTER', 
    description: 'In the ninth book in this series, set in 1906, the New York detective Isaac Bell contends with a crime boss passing as a respectable businessman and a tycoon’s plot against President Theodore Roosevelt.', 
    price: 21.21,
    author: 'Clive Cussler', 
    page_count: 150,
    publisher: 'Putnam',
    published_date: '2016-03-20'
  },
  {
    title: 'Handbook of Clinical Drug Data', 
    description: `This handbook, which in its early lustrous years served physicians, pharmacists, and pharmacy students, is unlike any other drug reference book in that it allows readers to compare and contrast various drugs within drug categories.`, 
    price: 51.00,
    author: 'Philip Anderson', 
    page_count: 1163,
    publisher: 'McGraw-Hill Medical',
    published_date: '2001-01-10'
  },
  {
    title: `Schaum's Immunology`, 
    description: `Tough Test Questions? Missed Lectures? Not Enough Time? Fortunately for you, there's Schaum's Outlines. More than 40 million students have trusted Schaum's to help them succeed in the classroom and on exams.`, 
    price: 25.00,
    author: 'George Pinchuk', 
    page_count: 509,
    publisher: 'McGraw-Hill',
    published_date: '2001-10-02'
  },
  {
    title: `Poucher's Perfumes, Cosmetics and Soaps`, 
    description: `Poucher's Perfumes Cosmetics and Soaps has been in print since 1923 and is the classic reference work in the field of cosmetics.`, 
    price: 11.11,
    author: 'Hilda Butler, H. Butler', 
    page_count: 820,
    publisher: 'Springer',
    published_date: '2000-05-12'
  },
];


exports.seed = function(knex) {
  return knex('books').del()
    .then(function () {
      return knex('books').insert(books);
    });
};
