const express = require('express');
const router = express.Router();
const db = require('./data/db-config');

// ==============================================

function getAllUsers() {
  return db('users');
}

// ==============================================

function getAllQuotes() {
  return db('quotes');
}

// ==============================================

async function insertUser(user) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newUserObject] = await db('users').insert(user, [
    'user_id',
    'username',
    'password',
  ]);
  return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
}

async function insertQuote(quote) {
  // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
  // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
  // UNLIKE SQLITE WHICH FORCES US DO DO A 2ND DB CALL
  const [newQuoteObject] = await db('quotes').insert(quote, [
    'quote_id',
    'quote',
    'attributed_to',
    'submitted_by',
  ]);
  return newQuoteObject;
}

// ==============================================

// [GET] /api/josh
router.get('/josh', (req, res) => {
  res.json({ message: 'josh. GET' });
});

// ==============================================

// [POST] /api/josh
router.post('/josh', (req, res) => {
  const body = req.body;

  res.json({ message: body.message });
});

// ==============================================

// [GET] /api/users
router.get('/users', async (req, res) => {
  res.json(await getAllUsers());
});

// ==============================================

// [POST] /api/users
router.post('/users', async (req, res) => {
  res.status(201).json(await insertUser(req.body));
});

// ==============================================

// [GET] /api/quotes
router.get('/quotes', async (req, res) => {
  const quotes = await getAllQuotes();
  console.log('[GET] /api/qoutes -> quotes: ', quotes);

  res.status(201).json(quotes);
});

// ==============================================

// [POST] /api/quotes
router.post('/quotes', async (req, res) => {
  console.log('[POST] /api/quotes -> req.body: ', req.body);

  res.status(201).json(await insertQuote(req.body));
  // res.status(201).json({ message: 'HI!' });
});

// ==============================================

module.exports = router;
