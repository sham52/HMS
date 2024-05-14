const express = require("express");
const router = require("./routes/router.js");
const pool = require("./config/db");

const app = express();

// Use the routes defined in routes.js
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
