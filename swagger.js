const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "Book Catalogue API",
    description:
      "Book catalogue api consisting of authors, genre, publishers and books",
  },
  host: "localhost:4242",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  // tags: [
  //   {
  //     name: "Genres",
  //     description: "Genres endpoint",
  //   },
  //   {
  //     name: "Authors",
  //     description: "Authors endpoint",
  //   },
  //   {
  //     name: "Publishers",
  //     description: "Publishers endpoint",
  //   },
  //   {
  //     name: "Books",
  //     description: "Books endpoint",
  //   },
  // ],
  // securityDefinitions: {
  //   apiKeyAuth: {
  //     type: "apiKey",
  //     in: "header", // can be "header", "query" or "cookie"
  //     name: "X-API-KEY", // name of the header, query parameter or cookie
  //     description: "any description...",
  //   },
  // },
  definitions: {
    Genre: {
      id: 1,
      name: "Technology",
    },
    Author: {
      id: 1,
      name: "Fredie Smith",
    },
    Publisher: {
      id: 1,
      name: "Your avg publishers",
    },
    Book: {
      id: 1,
      title: "Introduction to programming",
      description: "",
      price: 324,
      pageCount: 522,
      publishedDate: "",
      createdAt: "2021-10-11T16:29:19.321Z",
      updatedAt: "2021-10-11T16:29:19.321Z",
      genreId: 2,
      genre: {
        $ref: "#/definitions/Genre",
      },
      authors: [
        {
          $ref: "#/definitions/Author",
        },
      ],
      publishers: [
        {
          $ref: "#/definitions/Publisher",
        },
      ],
    },
    genresResponse: {
      results: [
        {
          $ref: "#/definitions/Genre",
        },
      ],
      total: 1343,
    },
    authorsResponse: {
      results: [
        {
          $ref: "#/definitions/Author",
        },
      ],
      total: 222,
    },
    publishersResponse: {
      results: [
        {
          $ref: "#/definitions/Publisher",
        },
      ],
      total: 33,
    },
    booksResponse: {
      results: [
        {
          id: 1,
          title: "Introduction to programming",
          description: "",
          price: 324,
          pageCount: 522,
          publishedDate: "23/03/2021",
          createdAt: "2021-10-11T16:29:19.321Z",
          updatedAt: "2021-10-11T16:29:19.321Z",
          genreId: 2,
        },
      ],
      total: 324,
    },
    authorResponse: { $ref: "#/definitions/Author" },
    genreResponse: { $ref: "#/definitions/Genre" },
    bookResponse: { $ref: "#/definitions/Book" },
    publisherResponse: { $ref: "#/definitions/Publisher" },
    addNewBookResponse: { $ref: "#/definitions/Book" },
    addNewPublisherResponse: { $ref: "#/definitions/Publisher" },
    addNewGenreResponse: { $ref: "#/definitions/Genre" },
    addNewAuthorResponse: { $ref: "#/definitions/Author" },
    AddBook: {
      $title: "Introduction to programming",
      description: "Great book for programming",
      $price: 324,
      $pageCount: 522,
      $publishedDate: "23/03/2021",
      $genreId: 2,
      $authorIds: [1, 2],
      $publisherIds: [4, 3]
    },
    UpdateBook: {
      $title: "Introduction to programming",
      description: "Great book for programming",
      $price: 324,
      $pageCount: 522,
      $publishedDate: "23/03/2021",
      $genreId: 2,
    },
    AddAuthor: {
      $name: "Fredie Smith",
    },
    AddGenre: {
      $name: "Literature",
    },
    AddPublisher: {
      $name: "Your avg publishers",
    },
  }
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app.js"); // Your project's root file
});
