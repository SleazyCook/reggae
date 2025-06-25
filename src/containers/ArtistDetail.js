// src/pages/ArtistDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import ArtistFlag from '../components/ArtistFlag';
import SocialLinks from '../components/SocialLinks';
import ArtistEventsList from '../components/ArtistEventsList';

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const docRef = doc(db, 'artists', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArtist({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such artist!');
          setArtist(null);
        }
      } catch (error) {
        console.error('Error fetching artist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <p>Loading artist...</p>;
  if (!artist) return <p>Artist not found</p>;

  return (
    <div className='artist-details page'>
        <div className='artist-name-block'>
            {/* Name */}
            <div className='artist-name'>
                {artist.name}
            </div>
            {/* Nationality */}
            <ArtistFlag nationality={artist.nationality} />
            {/* Socials */}
            <SocialLinks social={artist.social} />

            {/* Image */}
            <img className='artist-img' src={artist.image} />
        </div>

        <div className='artist-events-block'>
            {/* Events */}
            {artist.events && <ArtistEventsList events={artist.events} />}
        </div>

        <div className='artist-details-block'>
            {/* Quote */}
            <div className='artist-quote'>"{artist.quote}"</div>
            {/* Description */}
            <div className='artist-description'>{artist.description}</div>
        </div>


    </div>
  );
};

export default ArtistDetail;
