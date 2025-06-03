import React from "react";
import Navbar from "../components/navbar";
import Banner from "../components/Banner";
import MixCard from "../components/MixCard";
import Footer from "../components/Footer";
import QuizBanner from "../components/QuizBanner";
import Blog from "../components/Blog";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <MixCard />
      <QuizBanner />

      <Blog />
      <Footer />
    </>
  );
}

export default Home;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import SongCard from '../components/SongCard';

// const Home = () => {
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/songs');
//         setSongs(res.data);
//       } catch (err) {
//         setError('Erreur lors du chargement des chansons.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSongs();
//   }, []);

//   if (loading) return <p className="text-center mt-8">Chargement...</p>;
//   if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h1 className="text-2xl font-bold mb-4">🎶 Chansons disponibles</h1>
//       {songs.length === 0 ? (
//         <p>Aucune chanson trouvée.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {songs.map((song) => (
//             <SongCard key={song._id} song={song} onPlay={(s) => console.log('Lecture:', s)} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
