const express = require('express');
const yup = require('yup');

const { Publisher, BookPublishers } = require('../models');

const router = express.Router();

const addNewPublisherSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

router.get('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Publishers']
    // #swagger.description = 'Get all publishers'
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
        description: 'number of publishers returned',
        type: 'number'
      }
    */
    const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
    const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

    const publishers = await Publisher.query().page(page, limit);

    /* 
      #swagger.responses[200] = {
        description: 'Books fetched successfully',
        schema: { $ref: '#/definitions/publishersResponse' }
      } 
    */
    res.json(publishers);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Publishers']
    // #swagger.description = 'Add a new publisher'
  */

  try {
    /* 
      #swagger.parameters['publisher'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/AddPublisher' }
      }
    */
    await addNewPublisherSchema.validate(req.body, { abortEarly: false });

    const newPublisher = await Publisher.query().insert(req.body);

    /* 
      #swagger.responses[200] = {
        description: 'Publisher added successfully',
        schema: { $ref: '#/definitions/addNewPublisherResponse' }
      } 
    */
    res.json(newPublisher);
  } catch (error) {
    next(error);
  }
});

router.get('/:publisherId', async (req, res, next) => {
  /*
    // #swagger.tags = ['Publishers']
    // #swagger.description = 'Get a publisher by id'
  */
  const publisherId = req.params.publisherId ? Number(req.params.publisherId) : 1;

  try {
    const publisher = await Publisher.query()
      .where('id', publisherId)
      .select('*')
      .first();

    /* 
      #swagger.responses[200] = {
        description: 'Publisher fetched successfully',
        schema: { $ref: '#/definitions/publisherResponse' }
      } 
    */
    res.json(publisher);
  } catch (error) {
    next(error);
  }
});

router.get('/:publisherId/books', async (req, res, next) => {
  /*
    // #swagger.tags = ['Publishers']
    // #swagger.description = 'Get books for a publisher'
  */

    const publisherId = req.params.publisherId ? Number(req.params.publisherId) : 1;
  const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
  const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

  try {

    const books = await BookPublishers.query()
      .where('publisher_id', publisherId)
      .select('publishers.*')
      .join('publishers', 'book_publishers.publisher_id', 'publishers.id')
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
