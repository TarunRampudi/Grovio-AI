const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Database = require("better-sqlite3");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Database
const db = new Database("notes.db");
console.log("Connected to SQLite DB");

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
  )
`).run();

// Routes

// GET all notes
app.get("/notes", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM notes").all();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE note
app.post("/notes", (req, res) => {
  try {
    const { content } = req.body;
    const result = db
      .prepare("INSERT INTO notes (content) VALUES (?)")
      .run(content);

    res.json({ id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE note
app.put("/notes/:id", (req, res) => {
  try {
    const { content } = req.body;

    const result = db
      .prepare("UPDATE notes SET content = ? WHERE id = ?")
      .run(content, req.params.id);

    res.json({ updated: result.changes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE note
app.delete("/notes/:id", (req, res) => {
  try {
    const result = db
      .prepare("DELETE FROM notes WHERE id = ?")
      .run(req.params.id);

    res.json({ deleted: result.changes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});