const db = require('../models/student');

exports.addStudent = (req, res) => {
  const { name, email } = req.body;
  db.run(
    `INSERT INTO students (name, email) VALUES (?, ?)`,
    [name, email],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID,
        message: 'Etudiant ajouté avec succès'
       });
    }
  );
};

exports.listStudents = (req, res) => {
  db.all(`SELECT * FROM students`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

exports.searchStudent = (req, res) => {
  const { name } = req.query;
  db.all(`SELECT * FROM students WHERE name LIKE ?`, [`%${name}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};
