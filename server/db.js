// server/db.js
const mongoose = require("mongoose");

// (Optional) silence the strictQuery warning you saw
mongoose.set("strictQuery", true);

// 👇 Paste YOUR current creds from the Toolbox here
const mongoURI = "mongodb://root:ZXA6d0UDfgCm7leWfqa5k0kv@172.21.14.250:27017/?authSource=admin";

async function connectToMongo() {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    console.log("Connected to Mongo Successfully");
  } catch (err) {
    console.error("Mongo connection error:", err.message);
  }
}

module.exports = connectToMongo;
