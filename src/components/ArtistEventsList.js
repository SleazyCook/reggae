// import React, { useEffect, useState } from 'react';
// import { getDoc } from 'firebase/firestore';
// import { Link } from 'react-router-dom';

// const ArtistEventsList = ({ events }) => {
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       if (!Array.isArray(events)) return;

//       try {
//         const fetched = await Promise.all(
//           events.map(async (eventRef) => {
//             try {
//               const docSnap = await getDoc(eventRef);
//               if (docSnap.exists()) {
//                 const data = docSnap.data();

//                 let startDate = null;
//                 if (data?.time && typeof data.time.seconds === 'number') {
//                   startDate = new Date(data.time.seconds * 1000);
//                 }

//                 return {
//                   id: docSnap.id,
//                   name: data.name || 'Untitled Event',
//                   flyer: data.flyer || null,
//                   eventDate: startDate,
//                 };
//               } else {
//                 return { id: null, name: 'Unknown Event', eventDate: null };
//               }
//             } catch (err) {
//               console.error('Error fetching event:', err);
//               return { id: null, name: 'Error Loading Event', eventDate: null };
//             }
//           })
//         );

//         const now = Date.now(); // in ms

//         // Optional: log fetched events for debugging
//         fetched.forEach((event) => {
//           if (event.eventDate) {
//             console.log(`Event "${event.name}" @ ${event.eventDate.toISOString()}`);
//           }
//         });
//         console.log('Now:', new Date(now).toISOString());

//         // Sort by eventDate
//         fetched.sort((a, b) => {
//           if (!a.eventDate) return 1;
//           if (!b.eventDate) return -1;
//           return a.eventDate - b.eventDate;
//         });

//         const upcoming = [];
//         const past = [];

//         fetched.forEach((event) => {
//           if (event.eventDate && event.eventDate.getTime() >= now) {
//             upcoming.push(event);
//           } else {
//             past.push(event);
//           }
//         });

//         setUpcomingEvents(upcoming);
//         setPastEvents(past);
//       } catch (error) {
//         console.error('Error loading events:', error);
//       }
//     };

//     fetchEventData();
//   }, [events]);

//   if (!events?.length) return <p>No events for this artist.</p>;

//   return (
//     <div>
//       <h3>Upcoming Events</h3>
//       {upcomingEvents.length === 0 && <p>No upcoming events.</p>}
//       {upcomingEvents.map((event, i) => (
//         <div key={i}>
//           {event.id ? (
//             <Link to={`/events/${event.id}`}>
//               {event.flyer && (
//                 <img
//                   className="artist-event-flyer"
//                   src={event.flyer}
//                   alt={event.name}
//                 />
//               )}
//             </Link>
//           ) : (
//             <span>{event.name}</span>
//           )}
//         </div>
//       ))}

//       <h3>Past Events</h3>
//       {pastEvents.length === 0 && <p>No past events.</p>}
//       {pastEvents.map((event, i) => (
//         <div key={i}>
//           {event.id ? (
//             <Link to={`/events/${event.id}`}>
//               {event.flyer && (
//                 <img
//                   className="artist-event-flyer"
//                   src={event.flyer}
//                   alt={event.name}
//                 />
//               )}
//             </Link>
//           ) : (
//             <span>{event.name}</span>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ArtistEventsList;

import React, { useEffect, useState } from 'react';
import { getDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const ArtistEventsList = ({ events }) => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!Array.isArray(events)) return;

      try {
        const fetched = await Promise.all(
          events.map(async (eventRef) => {
            try {
              const docSnap = await getDoc(eventRef);
              if (docSnap.exists()) {
                const data = docSnap.data();

                let startDate = null;
                if (data?.time && typeof data.time.seconds === 'number') {
                  startDate = new Date(data.time.seconds * 1000);
                }

                return {
                  id: docSnap.id,
                  name: data.name || 'Untitled Event',
                  flyer: data.flyer || null,
                  eventDate: startDate,
                };
              } else {
                return { id: null, name: 'Unknown Event', eventDate: null };
              }
            } catch (err) {
              console.error('Error fetching event:', err);
              return { id: null, name: 'Error Loading Event', eventDate: null };
            }
          })
        );

        const now = Date.now();

        fetched.forEach((event) => {
          if (event.eventDate) {
            console.log(`Event "${event.name}" @ ${event.eventDate.toISOString()}`);
          }
        });
        console.log('Now:', new Date(now).toISOString());

        fetched.sort((a, b) => {
          if (!a.eventDate) return 1;
          if (!b.eventDate) return -1;
          return a.eventDate - b.eventDate;
        });

        const upcoming = [];
        const past = [];

        fetched.forEach((event) => {
          if (event.eventDate && event.eventDate.getTime() >= now) {
            upcoming.push(event);
          } else {
            past.push(event);
          }
        });

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    fetchEventData();
  }, [events]);

  if (!events?.length) return <p>No events for this artist.</p>;

  return (
    <div>
      <h3>Upcoming Events</h3>
      {upcomingEvents.length === 0 && <p>No upcoming events.</p>}
      <div className='artist-event-slider'>
        {upcomingEvents.map((event, i) => (
          <div key={i} >
            {event.id ? (
              <Link to={`/events/${event.id}`}>
                {event.flyer && (
                  <img
                    className="artist-event-flyer"
                    src={event.flyer}
                    alt={event.name}
                  />
                )}
              </Link>
            ) : (
              <span>{event.name}</span>
            )}
          </div>
        ))}
      </div>

      <h3>Past Events</h3>
      {pastEvents.length === 0 && <p>No past events.</p>}
      <div className='artist-event-slider'>
        {pastEvents.map((event, i) => (
          <div key={i} >
            {event.id ? (
              <Link to={`/events/${event.id}`}>
                {event.flyer && (
                  <img
                    className="artist-event-flyer"
                    src={event.flyer}
                    alt={event.name}
                  />
                )}
              </Link>
            ) : (
              <span>{event.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistEventsList;
