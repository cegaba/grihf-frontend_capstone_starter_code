// server/index.js
const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// your routes
app.use("/api/auth", require("./routes/auth")); // example

connectToMongo();

const PORT = 8181;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
