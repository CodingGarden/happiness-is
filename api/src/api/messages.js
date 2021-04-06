const express = require('express');

const queries = require('../../db/queries');

const router = express.Router();

router.get('/', async (req, res) => {
  const messages = await queries.getMessages();
  res.json(messages);
});

module.exports = router;
