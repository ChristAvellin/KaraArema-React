// const mongoose = require('mongoose');
// const logger = require('./logger');
// require('dotenv').config();

// const connectDB = () => {
//   try {
//     mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       maxPoolSize: 10,
//     });
//     logger.info('Connected to MongoDB Atlas');
//   } catch (err) {
//     logger.error(`MongoDB connection failed: ${err.message}`);
//     throw err;
//   }
// };

// mongoose.connection.on('disconnected', () => {
//   logger.warn('MongoDB disconnected, attempting reconnect...');
//   connectDB();
// });

// module.exports = connectDB;

//Début de la configuration de la base de données MongoDB

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected✅✅✅...");
  } catch (err) {
    console.error("MongoDB error❌❌❌:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;