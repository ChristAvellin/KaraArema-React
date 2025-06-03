import React, { useEffect, useState } from "react";
import axios from "axios";

const SongCatalogPage = () => {
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get("/api/songs");
        setSongs(res.data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter((song) =>
    `${song.title} ${song.artist}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Chargement des chansons...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">
        🎵 Catalogue de chansons
      </h1>

      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Rechercher par titre ou artiste..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {filteredSongs.length === 0 ? (
        <p className="text-center text-gray-500">Aucune chanson trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
          {filteredSongs.map((song) => (
            <div key={song._id} className="flex items-center space-x-4">
              <img
                src={song.coverImageUrl || "/default-cover.png"}
                alt={song.title}
                className="w-14 h-14 rounded-md object-cover shadow-sm"
              />
              <div>
                <p className="font-semibold text-gray-900">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SongCatalogPage;
