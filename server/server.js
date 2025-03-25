const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 5000;

app.use(express.json());

// Connect to (or create) the SQLite database
const db = new sqlite3.Database("./mydatabase.db", (err) => {
  if (err) {
    console.error("Error connecting to database", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create a "users" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    lastLogin DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error("Error creating table", err);
  } else {
    console.log("User table is ready.");
  }
});

// API endpoint to simulate login and store user info
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required." });
  }
  
  // For now, simply store the credentials (note: in production, never store plain text passwords!)
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.run(sql, [username, password], function (err) {
    if (err) {
      console.error("Error inserting user", err);
      res.status(500).json({ success: false, message: "Error storing user info." });
    } else {
      res.json({ success: true, message: "Login successful and user info stored.", userId: this.lastID });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
