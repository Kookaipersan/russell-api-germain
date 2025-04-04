const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Liste des réservations
router.get('/list', async (req, res) => {
  const reservations = await Reservation.find();
  res.render('reservations/list', { reservations });
});

// Formulaire d'ajout
router.get('/new', (req, res) => {
  res.render('reservations/new');
});

// Ajouter une réservation
router.post('/new', async (req, res) => {
  const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
  try {
    const newReservation = new Reservation({ catwayNumber, clientName, boatName, startDate, endDate });
    await newReservation.save();
    res.redirect('/reservations/list');
  } catch (error) {
    req.flash('errorMessage', error.message);
    res.redirect('/reservations/new');
  }
});

// Supprimer une réservation
router.post('/delete/:id', async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.id);
  res.redirect('/reservations/list');
});


// Formulaire d'édition
router.get('/edit/:id', async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      req.flash('errorMessage', 'Réservation introuvable.');
      return res.redirect('/reservations/list');
    }
    res.render('reservations/edit', { reservation });
  });
  
  // Traitement de la modification
  router.post('/edit/:id', async (req, res) => {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    try {
      await Reservation.findByIdAndUpdate(req.params.id, {
        catwayNumber,
        clientName,
        boatName,
        startDate,
        endDate
      });
      res.redirect('/reservations/list');
    } catch (error) {
      req.flash('errorMessage', error.message);
      res.redirect(`/reservations/edit/${req.params.id}`);
    }
  });
  




module.exports = router;



