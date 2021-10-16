const express = require('express');
const yup = require('yup');

const { Author, BookAuthors } = require('../models');

const router = express.Router();

const addNewAuthorSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

router.get('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Authors']
    // #swagger.description = 'Get all authors'
  */
  try {
    /* 
      #swagger.parameters['page'] = {
        in: 'query',
        required: false,
        description: 'page number',
        type: 'number'
      }
      #swagger.parameters['limit'] = {
        in: 'query',
        required: false,
        description: 'number of authors returned',
        type: 'number'
      }
    */
    const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
    const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

    const authors = await Author.query().page(page, limit);

    /* 
      #swagger.responses[200] = {
        description: 'Authors fetched successfully',
        schema: { $ref: '#/definitions/authorsResponse' }
      } 
    */
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Authors']
    // #swagger.description = 'Add a new author'
  */

  try {
    /* 
      #swagger.parameters['author'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/AddAuthor' }
      }
    */
    await addNewAuthorSchema.validate(req.body, {abortEarly: false});

    const newAuthor = await Author.query().insert(req.body);

    /* 
      #swagger.responses[200] = {
        description: 'Author added successfully',
        schema: { $ref: '#/definitions/addNewAuthorResponse' }
      } 
    */
    res.json(newAuthor);
  } catch (error) {
    next(error);
  }
});

router.get('/:authorId', async (req, res, next) => {
  /*
    // #swagger.tags = ['Authors']
    // #swagger.description = 'Get a author by id'
  */
  const authorId = req.params.authorId ? Number(req.params.authorId) : 1;

  try {
    const author = await Author.query().where('id', authorId).select('*').first();

    /* 
      #swagger.responses[200] = {
        description: 'Author fetched successfully',
        schema: { $ref: '#/definitions/authorResponse' }
      } 
    */
    res.json(author);
  } catch (error) {
    next(error);
  }
});

router.get('/:authorId/books', async (req, res, next) => {
  /*
    // #swagger.tags = ['Authors']
    // #swagger.description = 'Get books for a author'
  */

  const authorId = req.params.authorId ? Number(req.params.authorId) : 1;

  const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
  const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

  try {

    const books = await BookAuthors.query()
      .where('author_id', authorId)
      .select('books.*')
      .join('books', 'books_authors.book_id', 'books.id')
      .page(page, limit);

    /* 
      #swagger.responses[200] = {
        description: 'Books fetched successfully',
        schema: { $ref: '#/definitions/booksResponse' }
      } 
    */
    res.json(books);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
