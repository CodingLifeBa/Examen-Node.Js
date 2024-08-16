const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const booksRoutes = require('./routes/books');
const studentsRoutes = require('./routes/students');
const loansRoutes = require('./routes/loans');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware pour CORS
app.use(cors({
  origin: 'http://localhost:3000' // Remplacez par l'URL de votre frontend
}));

app.use(bodyParser.json());

// Routes
app.use('/books', booksRoutes);
app.use('/students', studentsRoutes);
app.use('/loans', loansRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
