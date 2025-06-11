import React from 'react';

export default function About() {
    return (
        <div className='row max-width'>
            <div className="col-12 about-container">
                <div style={{ position: 'relative', zIndex: 1 }} className="row">
                    <div className="col-6">
                        <h5 className='about-heading'>OUR VISION</h5>
                        <h2 className='about-title'>About Us</h2>
                        <p className='about-description m-0'>Daniel Reiling and Sean Jackson are the creators of PouncerAI and active freelancers on Upwork.</p>
                        <p className='about-description my-2'>Frustrated by the Upwork platform, they decided to create their own tools to help improve the way they attract potential clients from Upwork.</p>
                        <p className='about-description m-0'>Finding quality work on Upwork can be a challenge, and PouncerAI makes the entire process fast and easy.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}