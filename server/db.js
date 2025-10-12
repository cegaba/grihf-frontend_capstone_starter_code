// server/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Mongo connected");
  } catch (err) {
    console.error("❌ Mongo connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
