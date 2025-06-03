import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

const mixes = [
  {
    artist: 'Gnonna Gnonnas',
    title: 'Azòdé kponlon',
    genre: 'Africando',
    image: '/gnonnas.jpg'
  },
  {
    artist: 'Angélique Kidjo',
    title: 'revoir',
    genre: 'revoir',
    image: '/angelik.webp'
  },
  {
    artist: 'Danialou SAGBOHAN',
    title: 'Vignon',
    genre: 'Traditionnel',
    image: '/dani.webp'
  },
  {
    artist: 'Zeynab',
    title: 'Diovi',
    genre: 'Urbain',
    image: 'zey.jpg'
  },
  {
    artist: 'Sessime',
    title: 'Manvo',
    genre: 'Traditionnel',
    image: '/sesi.jpg'
  },
  {
    artist: 'Sessime',
    title: 'Fana',
    genre: 'Modern',
    image: 'sessi.jpg'
  },
  {
    artist: 'Africando',
    title: 'Petit pays',
    genre: 'Jazz & Soul',
    image: '/Africando.jpg'
  }
];

const MixCard = ({ artist, title, genre, image }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    // simulate audio playback
    console.log(isPlaying ? 'Stopping...' : 'Playing...');
  };

  return (
    <motion.div
      className="relative p-4 bg-white rounded-lg shadow-md max-w-80 overflow-hidden"
      whileHover={{ scale: 1.03 }}
    >
      <p className="text-gray-900 text-xl font-semibold uppercase">{artist}</p>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-gray-900 font-semibold text-sm mb-3">{genre}</p>
      <div className="relative">
        <img className="rounded-md w-full h-48 object-cover" src={image} alt={artist} />
        <div className="absolute inset-0 flex items-center justify-center">
          <IconButton
            onClick={togglePlay}
            className="bg-white bg-opacity-30 backdrop-blur-md shadow-lg hover:bg-opacity-50 transition duration-300"
            sx={{ borderRadius: '50%', padding: 2 }}
          >
            {isPlaying ? (
              <StopIcon sx={{ fontSize: 40, color: '#fff' }} />
            ) : (
              <PlayArrowIcon sx={{ fontSize: 40, color: '#fff' }} />
            )}
          </IconButton>
        </div>
      </div>
    </motion.div>
  );
};

const MixGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {mixes.map((mix, index) => (
      <MixCard key={index} {...mix} />
    ))}

    <motion.div
      className="p-4 bg-gray-100 rounded-lg shadow-inner flex flex-col items-center justify-center max-w-80 cursor-pointer hover:shadow-xl transition duration-300"
      whileHover={{ scale: 1.05 }}
    >
      <p className="text-gray-900 text-xl font-semibold uppercase">Charger plus</p>
      <p className="text-gray-500 text-sm">Découvrir plus de chansons</p>
    </motion.div>
  </div>
);

export default MixGrid;
