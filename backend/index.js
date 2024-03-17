const express = require("express");
const app = express();
const db = require("./db/db");

app.get("/api/patients", (req, res) => {
  db.query("SELECT * FROM Patients", (err, results) => {
    if (err) {
      console.error("Error querying database: " + err.stack);
      res.status(500).send("Error querying database");
      return;
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
