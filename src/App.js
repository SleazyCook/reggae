import { useState, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// App
import Navigation from './app/Navigation';
// import Footer from './app/Footer';
import ErrorPage from './app/ErrorPage';

// Containers
import Home from './containers/Home'
import Events from './containers/Events';
import EventDetail from './containers/EventDetail';
import Artists from './containers/Artists';
import ArtistDetail from './containers/ArtistDetail';

// Utilities

function App() {


  return (
      <Router>
            <Navigation /> 
              <Routes>
                <Route 
                  path="/" 
                  element={<Home /> } 
                />
                <Route path='/events' element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="artists/:id" element={<ArtistDetail />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
      </Router>
  );
}

export default App;
