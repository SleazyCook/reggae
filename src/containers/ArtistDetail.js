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
        <img   
            className="image-blurred-edge"
            style={{backgroundImage: `url(${artist.banner})`}} 
            src={artist.banner} />


        <div className='artist-left-block'>
            {/* Image */}
            <img className='artist-img' src={artist.image} />

            {/* Nationality */}
            {/* <span className='artist-label'>nationality</span> */}
            <ArtistFlag nationality={artist.nationality} />
        </div>

        <div className='artist-right-block'>
            <div className='artist-name-flexbox'>
                <div className='artist-name-block'>
                    {/* Artist Type */}
                    <div className='artist-label' style={{marginBottom:0}}>
                        {artist.type}
                    </div>
                    {/* Name */}
                    <div className='artist-name'>
                        {artist.name}
                    </div>
                </div>
                {/* Socials */}
                <SocialLinks social={artist.social} />
            </div>

            {/* Quote
            <div className='artist-quote'>"{artist.quote}"</div> */}
            {/* Description */}
            <div className='artist-description'>
                <span className='artist-label'>Bio</span>
                {artist.bio}</div>
        </div>


        {/* Events */}
        {artist.events && <ArtistEventsList events={artist.events} />}


    </div>
  );
};

export default ArtistDetail;
