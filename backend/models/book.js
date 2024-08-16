const sqlite3 = require('sqlite3').verbose();
const db = require('../database');

db.run(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    is_available BOOLEAN DEFAULT 1
  )
`);

module.exports = db;
