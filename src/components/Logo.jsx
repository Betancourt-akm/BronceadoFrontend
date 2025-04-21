import React from 'react';
import imgLogo from '../assest/banner/LOGOSPA.png';
import "./Logo.css"
const Logo = ({ w, h }) => {
  return (
    <img
      src={imgLogo}
      alt="Logo"
      className="text-2xl font-semibold py-4"
    />
  );
};

export default Logo;
