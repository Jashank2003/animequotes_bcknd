const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');

// Get a random quote
router.get('/random', async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const randomQuote = await Quote.findOne().skip(random);
    res.json(randomQuote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a random quote by anime name
router.get('/random/anime/:anime', async (req, res) => {
  try {
    const animeQuotes = await Quote.find({ anime: { $regex: new RegExp(req.params.anime, 'i') } });
    if (animeQuotes.length === 0) {
      return res.status(404).json({ message: 'No quotes found for this anime.' });
    }
    const random = Math.floor(Math.random() * animeQuotes.length);
    res.json(animeQuotes[random]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a random quote by character name
router.get('/random/character/:character', async (req, res) => {
  try {
    const characterQuotes = await Quote.find({ character: { $regex: new RegExp(req.params.character, 'i') } });
    if (characterQuotes.length === 0) {
      return res.status(404).json({ message: 'No quotes found for this character.' });
    }
    const random = Math.floor(Math.random() * characterQuotes.length);
    res.json(characterQuotes[random]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new quote
router.post('/', async (req, res) => {
  const quote = new Quote({
    quote: req.body.quote,
    character: req.body.character,
    anime: req.body.anime
  });

  try {
    const newQuote = await quote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
