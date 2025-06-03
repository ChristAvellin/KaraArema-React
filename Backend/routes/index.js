const express = require('express');
const router = express.Router();
const adminRoutes = require('./adminRoutes');
const authRoutes = require('./authRoutes');
const playlistRoutes = require('./playlistRoutes');
const songRoutes = require('./songRoutes');
const subscriptionRoutes = require('./subscriptionRoutes');

router.use('/admin', adminRoutes);
router.use('/auth', authRoutes);
router.use('/playlists', playlistRoutes);
router.use('/songs', songRoutes);
router.use('/subscriptions', subscriptionRoutes);

module.exports = router;