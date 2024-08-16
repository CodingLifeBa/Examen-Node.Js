const db = require('../models/loan');

// Prêter un livre
exports.loanBook = (req, res) => {
  const { book_id, student_id } = req.body;
  const loanDate = new Date().toISOString().split('T')[0];

  db.run(
    `INSERT INTO loans (book_id, student_id, loan_date) VALUES (?, ?, ?)`,
    [book_id, student_id, loanDate],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Marquer le livre comme emprunté (non disponible)
      db.run(
        `UPDATE books SET is_available = 0 WHERE id = ?`,
        [book_id],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ loan_id: this.lastID });
        }
      );
    }
  );
};

// Lister les emprunteurs pour un livre spécifique
exports.listLoansByBook = (req, res) => {
  const { id } = req.params;
  db.all(
    `SELECT students.name, students.email, loans.loan_date 
     FROM loans 
     JOIN students ON loans.student_id = students.id 
     WHERE loans.book_id = ? AND loans.return_date IS NULL`, // Seuls les prêts non retournés
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
};

// Lister les livres empruntés par un étudiant
exports.listLoansByStudent = (req, res) => {
  const { id } = req.params;
  db.all(
    `SELECT books.title, books.author, loans.loan_date 
     FROM loans 
     JOIN books ON loans.book_id = books.id 
     WHERE loans.student_id = ? AND loans.return_date IS NULL`, // Seuls les prêts non retournés
    [id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    }
  );
};

// Retourner un livre
exports.returnBook = (req, res) => {
  const { loan_id, book_id, student_id } = req.body;
  const returnDate = new Date().toISOString().split('T')[0];

  db.run(
    `UPDATE loans SET return_date = ? WHERE id = ?`,
    [returnDate, loan_id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Marquer le livre comme disponible
      db.run(
        `UPDATE books SET is_available = 1 WHERE id = ?`,
        [book_id],
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Supprimer l'entrée de prêt une fois que le livre est retourné
          db.run(
            `DELETE FROM loans WHERE id = ?`,
            [loan_id],
            function(err) {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              res.status(200).json({ message: "Livre retourné avec succès et prêt supprimé." });
            }
          );
        }
      );
    }
  );
};
