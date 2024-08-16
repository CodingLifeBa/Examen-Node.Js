const db = require('../models/book');

exports.addBook = (req, res) => {
    const { title, author, category } = req.body;
    db.run(
      `INSERT INTO books (title, author, category) VALUES (?, ?, ?)`,
      [title, author, category],
      function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
          id: this.lastID,
          message: 'Livre ajouté avec succès'
        });
      }
    );
  };

  exports.listBooks = (req, res) => {
    db.all(`SELECT * FROM books WHERE is_available = 1`, [], (err, rows) => {
      if (err) {
        console.error('Database error:', err);  
        return res.status(500).json({ error: err.message });
      }
      console.log('Books retrieved:', rows);  
      res.json(rows);
    });
  };
  

exports.searchBook = (req, res) => {
  const { title } = req.query;
  db.all(`SELECT * FROM books WHERE title LIKE ?`, [`%${title}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.searchByCategory = (req, res) => {
  const { name } = req.query;
  db.all(`SELECT * FROM books WHERE category LIKE ?`, [`%${name}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
