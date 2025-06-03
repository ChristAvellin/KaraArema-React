import React from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

const SongDetail = ({ song }) => {
  if (!song) return <p>Aucune chanson sélectionnée.</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{song.title}</h2>
      <p className="text-gray-700 mb-4">Artiste : {song.artist}</p>

      <AudioPlayer src={`http://localhost:5000/${song.filePath}`} />

      <Link
        to="/"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        ← Retour à la liste
      </Link>
    </div>
  );
};

export default SongDetail;
