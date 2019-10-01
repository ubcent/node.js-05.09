const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.get('/', async (req, res) => {
  const messages = await Message.find();

  res.json(messages);
});

router.get('/:id', async (req, res) => {
  const message = await Message.findById(req.params.id);

  res.json(message);
});

module.exports = router;