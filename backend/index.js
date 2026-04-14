const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());

// Database
const db = new sqlite3.Database("./notes.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite DB");
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT
  )
`);

// Routes

// Get all notes
app.get("/notes", (req, res) => {
  db.all("SELECT * FROM notes", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Create note
app.post("/notes", (req, res) => {
  const { content } = req.body;
  db.run("INSERT INTO notes (content) VALUES (?)", [content], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

// Update note
app.put("/notes/:id", (req, res) => {
  const { content } = req.body;
  db.run(
    "UPDATE notes SET content = ? WHERE id = ?",
    [content, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ updated: this.changes });
    }
  );
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  db.run("DELETE FROM notes WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
