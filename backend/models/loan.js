const sqlite3 = require('sqlite3').verbose();
const db = require('../database');

db.run(`
  CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    student_id INTEGER,
    loan_date DATE,
    return_date DATE,
    FOREIGN KEY(book_id) REFERENCES books(id),
    FOREIGN KEY(student_id) REFERENCES students(id)
  )
`);

module.exports = db;
