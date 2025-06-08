import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="logo" height='60px' width='auto'/>
            <p>Foodio is a food delivery app that connects you with the best restaurants in your area. Order your favorite dishes and enjoy them at home.</p>
            <p>Follow us on:</p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="icon" />
              <img src={assets.twitter_icon} alt="icon" />
              <img src={assets.linkedin_icon} alt="icon" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@foodio.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © foodio.com . All Rights Reserved .</p>
    </div>
  )
}

export default Footer
