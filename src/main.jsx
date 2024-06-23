import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import App from './App.jsx';
import AddAlbum from './components/albums/AddAlbum.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/:userId" element={<AddAlbum />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
