const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

// GET /catways : liste des catways
router.get('/', async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});

// GET /catways/:id : détails d’un catway
router.get('/:id', async (req, res) => {
  const catway = await Catway.findOne({ number: req.params.id });
  if (!catway) return res.status(404).json({ error: 'Catway non trouvé' });
  res.json(catway);
});

// POST /catways : créer un catway
router.post('/', async (req, res) => {
  const { number, type, status } = req.body;
  try {
    const newCatway = new Catway({ number, type, status });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /catways/:id : mise à jour de l'état
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const catway = await Catway.findOneAndUpdate(
      { number: req.params.id },
      { status },
      { new: true }
    );
    if (!catway) return res.status(404).json({ error: 'Catway non trouvé' });
    res.json(catway);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /catways/:id : suppression
router.delete('/:id', async (req, res) => {
  const deleted = await Catway.findOneAndDelete({ number: req.params.id });
  if (!deleted) return res.status(404).json({ error: 'Catway non trouvé' });
  res.json({ message: 'Catway supprimé' });
});

module.exports = router;
