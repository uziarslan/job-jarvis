import React from 'react';
import logo from '../Assets/images/logo.png';

export default function Footer() {
    return (
        <footer>
            <div className="max-width footer-container">
                <div>
                    <div className="branding-container">
                        <div className="branding-logo">
                            <img src={logo} alt="logo" />
                            <h2 className='company-name'>Job Jarvis</h2>
                        </div>
                        <h5 className='branding-title'>Providing the tools, tips, and tactics that help you succeed on Upwork.</h5>
                        <p className='branding-description'>Disclaimer: PouncerAI is an independent tool and is not affiliated with, endorsed by, or partnered with Upwork Inc. All product names, logos, and brands are property of their respective owners.</p>
                    </div>
                </div>
                <div className="footer-links-container">
                    <h5 className='footer-heading'>Company</h5>
                    <ul className='footer-links'>
                        <li>
                            <a href="/">Testimonials</a>
                        </li>
                        <li>
                            <a href="/">Pricing</a>
                        </li>
                        <li>
                            <a href="/">Benefits</a>
                        </li>
                        <li>
                            <a href="/">FAQs</a>
                        </li>
                        <li>
                            <a href="/">About us</a>
                        </li>
                        <li>
                            <a href="/">Affiliated Program</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-links-container">
                    <h5 className='footer-heading'>Legal</h5>
                    <ul className='footer-links'>
                        <li>
                            <a href="/">Terms & Conditions</a>
                        </li>
                        <li>
                            <a href="/">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-links-container">
                    <h5 className='footer-heading'>Contact</h5>
                    <ul className='footer-links'>
                        <li>
                            <a href="/">Support@company.com</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p className='footer-bottom-text'>&copy; Copyright 2025. Job Jarvis Inc. All rights reserved</p>
            </div>
        </footer>
    );
}