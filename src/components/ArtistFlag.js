// src/components/ArtistFlag.js
import React from 'react';

// Minimal map from country names to ISO 3166-1 alpha-2 codes
const countryCodeMap = {
  Nigeria: 'ng',
  'United States': 'us',
  Canada: 'ca',
  'United Kingdom': 'gb',
  France: 'fr',
  Germany: 'de',
  'South Africa': 'za',
  Japan: 'jp',
  Brazil: 'br',
  // Add more as needed
};

const ArtistFlag = ({ nationality }) => {
  const code = countryCodeMap[nationality];

  if (!code) return <p>🌐 {nationality}</p>; // fallback if unknown

  const flagUrl = `https://flagcdn.com/w40/${code}.png`;

  return (
    <div className='artist-nationality'>
      <img src={flagUrl} alt={nationality + ' flag'} width="30" />
      <span>{nationality}</span>
    </div>
  );
};

export default ArtistFlag;
