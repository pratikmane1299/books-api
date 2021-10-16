const express = require('express');
const yup = require('yup');

const { Genre, Book } = require('../models');

const router = express.Router();

const addNewGenreSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

router.get('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Genres']
    // #swagger.description = 'Get all genres'
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
        description: 'number of genres returned',
        type: 'number'
      }
    */
    const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
    const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

    const genres = await Genre.query().page(page, limit);
    
    /* 
      #swagger.responses[200] = {
        description: 'Genres fetched successfully',
        schema: { $ref: '#/definitions/genresResponse' }
      } 
    */
    res.json(genres);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Genres']
    // #swagger.description = 'Add a new genre'
  */

  try {
    /* 
      #swagger.parameters['genre'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/AddGenre' }
      }
    */
    await addNewGenreSchema.validate(req.body, {abortEarly: false});

    const newGenre = await Genre.query().insert(req.body);

    /* 
      #swagger.responses[200] = {
        description: 'Genre added successfully',
        schema: { $ref: '#/definitions/addNewGenreResponse' }
      } 
    */
    res.json(newGenre);
  } catch (error) {
    next(error);
  }
});

router.get('/:genreId', async (req, res, next) => {
  /*
    // #swagger.tags = ['Genres']
    // #swagger.description = 'Get a genre by id'
  */
  const genreId = req.params.genreId ? Number(req.params.genreId) : 1;

  try {
    const genre = await Genre.query().where('id', genreId).select('*').first();

    /* 
      #swagger.responses[200] = {
        description: 'Genre fetched successfully',
        schema: { $ref: '#/definitions/genreResponse' }
      } 
    */
    res.json(genre);
  } catch (error) {
    next(error);
  }
});

router.get('/:genreId/books', async (req, res, next) => {
  /*
    // #swagger.tags = ['Genres']
    // #swagger.description = 'Get books for a genre'
  */

  const genreId = req.params.genreId ? Number(req.params.genreId) : 1;
  const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
  const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

  try {
    const books = await Book.query()
      .where('genre_id', genreId)
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
