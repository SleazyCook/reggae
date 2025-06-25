import { FaInstagram, FaXTwitter, FaFacebook, FaTiktok, FaLink, FaSoundcloud, FaYoutube, FaSpotify } from 'react-icons/fa6'; // or any icon lib

const SocialLinks = ({ social }) => {
  if (!social) return null;

  const iconMap = {
    instagram: <FaInstagram />,
    x: <FaXTwitter />,
    twitter: <FaXTwitter />,
    facebook: <FaFacebook />,
    tiktok: <FaTiktok />,
    soundcloud: <FaSoundcloud />,
    youtube: <FaYoutube />,
    spotify: <FaSpotify />
  };

  const orderedSocials = Object.keys(social)
    .sort() // alphabetize keys
    .reduce((acc, key) => {
    acc[key] = social[key];
    return acc;
  }, {});


  return (
    <div className="artist-social-links">
      {Object.entries(orderedSocials).map(([platform, url]) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {iconMap[platform.toLowerCase()] || <FaLink />}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
