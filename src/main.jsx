import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import App from './components/app/App.jsx';
import Album from './components/albums/Album.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Header />
      <Routes>
        {/* App route path & Add Album */}
        <Route path="/" element={<App />} />
        <Route path="/user/:userId" element={<Album />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
