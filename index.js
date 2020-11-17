const app = require('./app');

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
