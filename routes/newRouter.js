const express = require('express');
const router = express.Router();

// Define a route for the /new path
router.get('/', (req, res) => {
  res.render('form', { title: 'Add a New Message' });
});

module.exports = router;