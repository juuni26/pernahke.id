import React from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const NotFound = () => (
  <div className="not-found">
    
    <img src="images/404.png"></img>
    <h4>Halaman tidak ditemukan !</h4>
    <Link to="/">
      Kembali ke halaman awal
    </Link>
  </div>
);

export default NotFound;