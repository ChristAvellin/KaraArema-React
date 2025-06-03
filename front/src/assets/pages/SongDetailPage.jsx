// src/pages/SongDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SongDetail from './SongDetail';

const SongDetailPage = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get(`http://localhost:5000/api/songs/${id}`)
      .then(res => {
        setSong(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Chanson introuvable');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return <SongDetail song={song} />;
};

export default SongDetailPage;
