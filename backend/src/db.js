import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    data TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    website TEXT,
    email TEXT,
    location TEXT,
    status TEXT,
    emailOpened INTEGER DEFAULT 0,
    cvClicked INTEGER DEFAULT 0,
    reply TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
  )`);
});

export default db;
