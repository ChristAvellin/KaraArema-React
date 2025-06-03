import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Pencil, Trash2 } from 'lucide-react';

const AdminUpload = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/songs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSongs(res.data);
    } catch (err) {
      console.error('Erreur lors de la récupération des chansons');
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!title || !artist || !genre || !audio) {
      setError('Champs requis manquants.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('genre', genre);
      formData.append('lyrics', lyrics);
      formData.append('audio', audio);
      if (image) formData.append('image', image);

      const token = localStorage.getItem('token');

      await axios.post('http://localhost:5000/api/songs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Chanson ajoutée avec succès 🎉');
      setTitle('');
      setArtist('');
      setGenre('');
      setLyrics('');
      setAudio(null);
      setImage(null);
      fetchSongs();
    } catch (err) {
      setError("Erreur lors de l'upload.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/songs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSongs();
    } catch (err) {
      console.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow mb-10"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Upload de chanson</h2>
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleUpload} className="space-y-4">
          <input type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Artiste" value={artist} onChange={(e) => setArtist(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full p-2 border rounded" required />
          <textarea placeholder="Paroles (facultatif)" value={lyrics} onChange={(e) => setLyrics(e.target.value)} className="w-full p-2 border rounded" rows={4} />
          <input type="file" accept="audio/*" onChange={(e) => setAudio(e.target.files[0])} className="w-full" required />
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Ajouter la chanson
          </button>
        </form>
      </motion.div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Liste des chansons</h3>
        <div className="space-y-4">
          {songs.map((song) => (
            <motion.div
              key={song._id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between bg-gray-50 p-4 rounded shadow-sm"
            >
              <div>
                <h4 className="font-semibold">{song.title} <span className="text-sm text-gray-500">- {song.artist}</span></h4>
                <p className="text-sm text-gray-600">{song.genre}</p>
              </div>
              <div className="flex gap-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <Pencil size={18} />
                </button>
                <button onClick={() => handleDelete(song._id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;
