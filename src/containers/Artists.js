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

  return (
    <div className='artist-detail'>
        <h2>Artists</h2>
        <ul>
            {artists.map(artist => (
                <li key={artist.id}>
                    <Link to={`/artists/${artist.id}`}>
                        {artist.name || 'Unnamed Artist'}
                    </Link>
                </li>
            ))}
        </ul>



    </div>
  );
};

export default Artists;
