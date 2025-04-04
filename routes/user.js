const express = require('express');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const router = express.Router();
const passport = require('passport');

// Formulaire de connexion
router.get('/login', (req, res) => {
  res.render('users/login'); // page de login
});

// Login de l'utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Trouver l'utilisateur par email
  const user = await User.findOne({ email });

  // Vérifier si l'utilisateur existe et comparer les mots de passe
  if (!user || !(await user.matchPassword(password))) {
    return res.render('users/login', { errorMessage: 'Email ou mot de passe invalide' });
  }

  // Démarrer la session et rediriger vers le tableau de bord
  req.session.userId = user._id;
  res.redirect('/dashboard');
});

// Déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/dashboard');
    res.redirect('/');
  });
});

module.exports = router;
