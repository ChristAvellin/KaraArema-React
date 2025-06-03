// scripts/createAdminUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assurez-vous que le chemin est correct

const email = process.argv[2] || 'admin@karaarema.com';
const password = process.argv[3] || 'admin1234';
const role = process.argv[4] || 'admin';

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Erreur : MONGO_URI manquant dans .env');
  process.exit(1);
}

(async () => {
  try {
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connexion MongoDB ✓');

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Utilisateur déjà existant : ${existing.email}`);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new User({ email, password: hashedPassword, role });
    await adminUser.save();

    console.log('Utilisateur admin créé avec succès :');
    console.log(`  Email : ${email}`);
    console.log(`  Mot de passe : ${password}`);
    console.log(`  Rôle : ${role}`);
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur admin :', err);
  } finally {
    await mongoose.disconnect();
  }
})();
