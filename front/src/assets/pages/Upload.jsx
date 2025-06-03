import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Upload = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [genre, setGenre] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setPreview(null);

    if (!title || !artist || !genre || !audioFile || !coverFile) {
      setError('Tous les champs obligatoires doivent être remplis.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('genre', genre);
      formData.append('lyrics', lyrics);
      formData.append('audio', audioFile);
      formData.append('cover', coverFile);

      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:5000/api/songs/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Chanson ajoutée avec succès 🎉');
      setPreview({
        title,
        artist,
        genre,
        lyrics,
        audioUrl: URL.createObjectURL(audioFile),
        coverUrl: URL.createObjectURL(coverFile),
      });

      // Reset form
      setTitle('');
      setArtist('');
      setGenre('');
      setLyrics('');
      setAudioFile(null);
      setCoverFile(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de l'upload.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Upload de chanson</h2>

      {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Titre</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Artiste</label>
          <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Paroles (optionnel)</label>
          <textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md" rows={4} />
        </div>

        <div>
          <label className="block text-sm font-medium">Fichier audio (MP3)</label>
          <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="w-full mt-1" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Image de couverture</label>
          <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} className="w-full mt-1" required />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Upload</button>
      </form>

      {preview && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2">Aperçu :</h3>
          {preview.coverUrl && <img src={preview.coverUrl} alt="Cover" className="w-32 h-32 object-cover rounded mb-3" />}
          <p><strong>Titre :</strong> {preview.title}</p>
          <p><strong>Artiste :</strong> {preview.artist}</p>
          <p><strong>Genre :</strong> {preview.genre}</p>
          {preview.lyrics && <p><strong>Paroles :</strong> {preview.lyrics}</p>}
          <audio controls className="mt-3 w-full">
            <source src={preview.audioUrl} type="audio/mpeg" />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Upload;
