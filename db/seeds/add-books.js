const axios = require('axios');

const books = [
  {
    title: 'THE GANGSTER', 
    description: 'In the ninth book in this series, set in 1906, the New York detective Isaac Bell contends with a crime boss passing as a respectable businessman and a tycoon’s plot against President Theodore Roosevelt.', 
    price: 21.21,
    authors: ['Clive Cussler'], 
    pageCount: 150,
    genre: 'Fiction',
    publishers: ['Putnam'],
    publishedDate: '2016-03-20'
  },
  {
    title: 'Handbook of Clinical Drug Data', 
    description: `This handbook, which in its early lustrous years served physicians, pharmacists, and pharmacy students, is unlike any other drug reference book in that it allows readers to compare and contrast various drugs within drug categories.`, 
    price: 51.00,
    authors: ['Philip Anderson'], 
    pageCount: 1163,
    genre: ['Literature'],
    publishers: ['McGraw-Hill Medical'],
    publishedDate: '2001-01-10'
  },
  {
    title: `Schaum's Immunology`, 
    description: `Tough Test Questions? Missed Lectures? Not Enough Time? Fortunately for you, there's Schaum's Outlines. More than 40 million students have trusted Schaum's to help them succeed in the classroom and on exams.`, 
    price: 25.00,
    authors: ['George Pinchuk'], 
    pageCount: 509,
    genre: 'Health',
    publishers: ['McGraw-Hill'],
    publishedDate: '2001-10-02'
  },
  {
    title: `Poucher's Perfumes, Cosmetics and Soaps`, 
    description: `Poucher's Perfumes Cosmetics and Soaps has been in print since 1923 and is the classic reference work in the field of cosmetics.`, 
    price: 11.11,
    authors: ['Hilda Butler', 'H. Butler'], 
    pageCount: 820,
    genre: 'Lifestyle',
    publishers: ['Springer'],
    publishedDate: '2000-05-12'
  },
];

async function fetchDummyData() {
  try {
    // console.log('--------------- Fetching Employess ---------------');
    // const { data } = await axios.get(
    //   `https://fakerapi.it/api/v1/books?_quantity=100`
    // );

    const fs = require('fs').promises;

    const data = await fs.readFile('./db/seeds/books.json');
    return JSON.parse(data.toString());

  } catch(error) {
    console.error(error);
  }
}

function generateRandomNumber() {
  return Math.floor(Math.random()*(999-100+1)+100);
}

exports.seed = async function(knex) {

  try {
    await knex('authors').del();
    await knex('publishers').del();
    await knex('genres').del();
    await knex('books').del();
    await knex('book_publishers').del();
    await knex('books_authors').del();

    const books = await fetchDummyData();
    for(let i = 0; i <books.length; i++) {
      const book = books[i];

      let genreId = await knex('genres').where({name: book.genre}).select('id').first();
      let authorId = await knex('authors').where({name: book.author}).select('id').first();
      let publisherId = await knex('publishers').where({name: book.publisher}).select('id').first();

      // genreId = await knex('genres').insert({name: book.genre});
      // authorId = await knex('authors').insert({name: book.author});
      // publisherId = await knex('publishers').insert({name: book.publisher});

      if (!genreId) {
        genreId = await knex('genres').insert({name: book.genre}).returning('id');
        genreId = { id: genreId[0]}
      }

      if (!authorId) {
        authorId = await knex('authors').insert({name: book.author}).returning('id');
        authorId = { id: authorId[0]}
      }

      if (!publisherId) {
        publisherId = await knex('publishers').insert({name: book.publisher}).returning('id');

        publisherId = { id: publisherId[0]}
      }

      const insertedBook = await knex("books").insert({
        title: book.title,
        description: book.description,
        published_date: book.published,
        genre_id: genreId.id,
        price: generateRandomNumber(),
        page_count: generateRandomNumber(),
      }).returning('*');
        await knex('book_publishers').insert({ book_id: insertedBook[0].id, publisher_id: publisherId.id });
        await knex('books_authors').insert({ book_id: insertedBook[0].id, author_id: authorId.id });
    }

    // books.forEach(async (book) => {
    //   // await knex("book").insert({
    //   //   title: book.title,
    //   //   description: book.description,
    //   //   published_date: book.published,
    //   // });

    //   await knex('genres').insert({name: book.genre});
      
    //   // let genreId = await knex('genres').where({name: book.genre}).select('id');
    //   // // let authorId = await knex('authors').where({name: book.author}).select('id');
    //   // let publisherId = await knex('publishers').where({name: book.publisher}).select('id');

    //   // console.log({genreId});
    //   // if (!genreId) {
    //   //   genreId = await knex('genres').insert({name: book.genre});
    //   // }

    //   // if (!authorId) {
    //   //   authorId = await knex('authors').insert({name: book.author});
    //   // }

    //   // if (!publisherId) {
    //   //   publisherId = await knex('publishers').insert({name: book.publisher});
    //   // }
    // });
  } catch (error) {
    console.log(error);
  }

  // return knex('books').del()
  //   .then(function () {
  //     return knex('books').insert(books);
  //   });
};
