const express = require('express');
const yup = require('yup');

const { Book, BookAuthors, BookPublishers, Genre } = require('../models');

const router = express.Router();

const addNewBookSchema = yup.object().shape({
  title: yup.string().required('Name is required'),
  description: yup.string(),
  price: yup.number().positive('price must be greater than 0'),
  pageCount: yup.number().positive().required('Page count is required'),
  publishedDate: yup.string().required('Published date is required'),
  genreId: yup.number().positive('Genreid should be a whole number'),
  authorIds: yup.array().of(yup.number('AuthorId should be whole number')).required('AuthorIds is required'),
  publisherIds: yup.array().of(yup.number()).required('PublisherIds is required'),
});

const updateBookSchema = yup.object().shape({
  title: yup.string().required('Name is required'),
  description: yup.string(),
  price: yup.number().positive('price must be greater than 0'),
  pageCount: yup.number().positive().required('Page count is required'),
  publishedDate: yup.string().required('Published date is required'),
  genreId: yup.number().positive('Genreid should be a whole number'),
});

router.get('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Books']
    // #swagger.description = 'Get all books'
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
        description: 'number of books returned',
        type: 'number'
      }
    */
    const page = req.query.page ? Math.floor(Math.abs(Number(req.query.page))) : 0;
    const limit = req.query.limit ? Math.floor(Math.abs(Number(req.query.limit))) : 5;

    const books = await Book.query().page(page, limit);

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

router.get('/:id', async (req, res, next) => {
  /*
    // #swagger.tags = ['Books']
    // #swagger.description = 'Get a book by id'
  */
  try {
    const { id } = req.params;

    const book = await Book.query()
      .select("*")
      .where("id", "=", id)
      .first()
      .withGraphFetched("[authors, genre, publishers]");

    if (!book) {
      return res.status(404).json({ message: `Book with id ${id} not found.`})
    }
    
    /* 
      #swagger.responses[200] = {
        description: 'Book fetched successfully',
        schema: { $ref: '#/definitions/bookResponse' }
      }
    */
    res.json(book);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  /*
    // #swagger.tags = ['Books']
    // #swagger.description = 'Add a new book'
  */


  try {
    await addNewBookSchema.validate(req.body, { abortEarly: false });

    /* 
      #swagger.parameters['book'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/AddBook' }
      }
    */
    const data = req.body;

    const genreIds = await Genre.query().distinct().select("id");
    if (!genreIds.some(({ id }) => id === data.genreId)) {
      res.status(400).json({ message: "Not a valid genre id" });
      return;
    }

    const newBook = await Book.query().insert({
      title: data.title,
      description: data.description,
      pageCount: data.pageCount,
      price: data.price,
      publishedDate: data.publishedDate,
      genreId: data.genreId,
    });

    await BookAuthors.query().insert(
      data.authorIds.map((id) => {
        return { bookId: newBook.id, authorId: id };
      })
    );

    await BookPublishers.query().insert(
      data.publisherIds.map((id) => {
        return { bookId: newBook.id, publisherId: id };
      })
    );

    /* 
      #swagger.responses[200] = {
        description: 'Book added successfully',
        schema: { $ref: '#/definitions/addNewBookResponse' }
      } 
    */
    res.json(newBook);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  /*
    // #swagger.tags = ['Books']
    // #swagger.description = 'Update a book by id'
  */

  try {
    /* 
      #swagger.parameters['book'] = {
        in: 'body',
        required: true,
        type: 'object',
        schema: { $ref: '#/definitions/UpdateBook' }
      }
    */
    await updateBookSchema.validate(req.body, {abortEarly: false});

    const { id } = req.params;

    const book = await Book.query().where('id', id).select('*').first();

    if (!book) {
      return res.status(404).json({ message: `Book with id ${id} not found.`})
    }

    const genreIds = await Genre.query().distinct().select('id');

    const data = req.body;

    if (!genreIds.some(({ id }) => id === data.genreId)) {
      res.status(400).json({message: 'Not a valid genre id'});
      return;
    }

    const response = await Book.query()
      .update({
        title: data.title,
        description: data.description,
        pageCount: data.pageCount,
        price: data.price,
        publishedDate: data.publishedDate,
        genreId: data.genreId,
      })
      .where('id', id)
      .returning('*');

    /*
      #swagger.responses[400] = {
        description: 'Invalid Genre id',
        schema: { message: 'Not a valid genre id' }
      }
      #swagger.responses[404] = {
        description: 'Book not found',
        schema: { message: 'Book not found' }
      }
      #swagger.responses[200] = {
        description: 'Book updated successfully',
        schema: { $ref: '#/definitions/Book' }
      } 
    */
    res.json(response[0]);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  /*
    // #swagger.tags = ['Books']
    // #swagger.description = 'Delete a book by id'
  */
  try {
    const { id } = req.params;

    const book = await Book.query().where('id', id).select('*').first();

    if (!book) {
      return res.status(404).json({ message: `Book with id ${id} not found.`})
    }

    const response = await Book.query()
      .delete()
      .where('id', id)
      .returning('*');

    /*
      #swagger.responses[404] = {
        description: 'Book not found',
        schema: { message: 'Book not found' }
      }
      #swagger.responses[200] = {
        description: 'Book deleted successfully',
        schema: { $ref: '#/definitions/Book' }
      } 
    */
    res.json(response[0]);
  } catch (error) {
    next(error)
  }
});

module.exports = router;
