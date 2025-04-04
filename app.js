const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
const mongodb  = require('./db/mongo');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user");
const catwaysRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');

const app = express();

// Définir le moteur de vue EJS
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB :', err));

// Configuration de la session
app.use(session({
  secret: 'russell-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // `true` si HTTPS
}));

// Configuration des messages flash
app.use(flash());

// Middleware pour rendre les messages flash disponibles dans toutes les vues
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

// Middleware pour parser le corps de la requête
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use('/catways', catwaysRoutes);
app.use('/reservations', reservationRoutes);

// Route d'accueil
app.get("/", (req, res) => {
  res.render("index", { title: "Accueil" });
});

// Autres routes
app.get("/catways", (req, res) => {
  res.render("catways", { title: "Catways" });
});
app.get("/reservations", (req, res) => {
  res.render("reservations", { title: "Réservations" });
});
app.get("/utilisateurs", (req, res) => {
  res.render("utilisateurs", { title: "Utilisateurs" });
});
app.get("/tableaudebord", (req, res) => {
  res.render("tableaudebord", { title: "Tableau de Bord" });
});

// Initialisation du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;
