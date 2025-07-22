const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');

// Show all messages
router.get('/', async (req, res) => {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .order('date', { ascending: false });

  debugger; // <-- Add debugger here to inspect messages and error

  if (error) return res.status(500).send(error.message);
  
  res.render("index", { title: "Mini Messageboard", messages });
});

// Handle form submission for adding a new message
router.post('/new', async (req, res) => {
  const { user, text } = req.body;
  if (user && text) {
    const { error } = await supabase
      .from('messages')
      .insert([{ user, message: text, date: new Date() }]);
    if (error) return res.status(500).send(error.message);
    res.redirect('/');
  } else {
    res.status(400).send('Both name and message are required.');
  }
});

// Route to display details of a specific message
router.get('/message/:id', async (req, res) => {
  const { data: message, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', req.params.id)
    .single();

  if (error || !message) return res.status(404).send('Message not found');
  res.render('message', { title: 'Message Details', message });
});

module.exports = router;
