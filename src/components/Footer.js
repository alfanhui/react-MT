import React from 'react';
import {Link} from 'react-router-dom'
//import {Footer} from 'react-materialize';

const Footer = () => (
      <footer id="foot">
        <div className="foot1">
          <Link to="/" className="grey-text text-lighten-3">Home</Link>
          <span>&copy; 2017 Copyright</span>
        </div>
      </footer>
);
export default Footer;
