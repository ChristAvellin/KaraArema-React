// // server.js
// require('dotenv').config();
// const app = require('../Backend/app.js');
// const connectDB = require('../Backend/config/database.js');
// const { connect: connectValkey } = require('../Backend/config/valkey.js');
// const logger = require('../Backend/config/logger.js');
// const cacheWarmer = require('../Backend/scripts/cacheWarmer.js');
// const { refreshConfig } = require('../Backend/config/configManager.js');
// connectDB();

// const startServer = () => {
//   try {
//     refreshConfig();
//     cacheWarmer();
//     app.listen(process.env.PORT, () => {
//       logger.info(`Server running on http://localhost:${process.env.PORT}`);
//     });
//   } catch (err) {
//     logger.error(`Server startup failed: ${err.message}`);
//     process.exit(1);
//   }
// };

// startServer();


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/database");
const errorHandler = require("./middlewares/errorMiddleware");

dotenv.config();

const adminRoute = require("./routes/adminRoutes");
const userRoute = require("./routes/authRoutes");
const music = require("./routes/songRoutes");
const songRoutes = require('./routes/songRoutes');


const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/upload/songs", express.static(path.join(__dirname, "upload/songs")));

app.use('/upload/images', express.static(path.join(__dirname, 'upload/images')));


app.use("/admin", adminRoute);
app.use("/user", userRoute);
//app.use("/song", music);
app.use('/upload', songRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Bienvenue sur KaraArema!");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});