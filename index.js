require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const indexRouter = require('./routes/indexRouter');
const newRouter = require('./routes/newRouter');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Routes
app.use("/", indexRouter);
app.use('/new', newRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
