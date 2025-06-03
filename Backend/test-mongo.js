require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('✅ Connexion réussie à MongoDB !');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Erreur de connexion :', err);
    process.exit(1);
  });
