const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

const express = require('express');
const router = express.Router();

// Pass the messages array to the index.ejs view
router.get('/', (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// Handle form submission for adding a new message
router.post('/new', (req, res) => {
  const { user, text } = req.body;
  if (user && text) {
    const newMessage = {
      text,
      user,
      added: new Date()
    };
    messages.push(newMessage);
    res.redirect('/');
  } else {
    res.status(400).send('Both name and message are required.');
  }
});

module.exports = router;
