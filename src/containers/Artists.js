// src/components/ArtistsList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'artists'));
        const artistsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArtists(artistsData);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) return <p>Loading artists...</p>;

    function sortArtistsByName(artists) {
        return [...artists].sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
        );
    }
    const sortedArtists = sortArtistsByName(artists);


  return (
    <div className='artist-listing page'>
        <h2>Artists</h2>
        <div className='artist-listing-container'>
            {sortedArtists.map(artist => (
                <Link to={`/artists/${artist.id}`} key={artist.id} className='artist-listing-card'>
                    <img src={artist.image} />
                    <span>{artist.name || 'Unnamed Artist'}</span>
                </Link>
            ))}
        </div>



    </div>
  );
};

export default Artists;
