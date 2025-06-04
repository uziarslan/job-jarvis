import React from 'react';
import Navbar from '../Components/Navbar';
import starsIcon from '../Assets/images/stars-icon.svg';
import { Button, styled } from '@mui/material';
import chrome from '../Assets/images/chrome-white-icon.svg';
import playIcon from '../Assets/images/play-icon.svg';
import fadedArrow from '../Assets/images/faded-arrow.svg';
import peopleImage from '../Assets/images/people.png';
import forFreelancersImage from '../Assets/images/freelancersection.jpg';

const ButtonWithStyles = styled(Button)(({ theme }) => ({
    background: "linear-gradient(180deg, #16D3F0 0%, #00AEEF 100%)",
    color: "#F8F8F8",
    borderRadius: 40,
    padding: "8px 19px",
    fontWeight: 600,
    fontSize: 14,
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    "& img": {
        width: 20,
        height: 20,
    }
}));

const ButtonWithStylesOutline = styled(Button)(({ theme }) => ({
    background: "transparent",
    color: "#202020",
    borderRadius: 40,
    padding: "8px 19px",
    fontWeight: 400,
    textTransform: "capitalize",
    fontSize: 14,
    fontFamily: "Poppins",
    "& img": {
        width: 20,
        height: 20,
    }
}));

export default function Homepage() {
    return (
        <div className="position-relative">
            <Navbar />
            <div className="heroSectionEllipses" />
            <div className="heroSectionEllipsesBottomRight" />
            <div className="heroSection">
                <div className="d-flex flex-column align-items-center justify-content-end">
                    <div className="heroContent">
                        <div className="aiProposalWrapper">
                            <img src={starsIcon} alt="stars" />
                            AI PROPOSAL TOOL FOR UPWORK
                        </div>
                        <h1 className="heroTitle">Upwork Cover Letters That Convert</h1>
                        <p className="brandTagLine">Tired of spending time and Connects on Cover Letter proposals that never get viewed?</p>
                        <p className="brandInfo">Then you need to try Job Jarvis - a new AI tool that generates highly personalized cover letter proposals in seconds. Stop wasting time and start closing more clients with Job Jarvis.</p>
                        <div className="d-flex flex-row gap-3 justify-content-center">
                            <ButtonWithStyles startIcon={<img src={chrome} alt="chrome" />} variant="contained" color="primary">add to chrome</ButtonWithStyles>
                            <ButtonWithStylesOutline startIcon={<img src={playIcon} alt="play" />}>watch demo</ButtonWithStylesOutline>
                        </div>
                        <div className="heroStats">
                            <div className="statsTextWrapper">
                                <h6 className="statsHeading">1k+</h6>
                                <p className="statsText">freelancers have already joined!</p>
                            </div>
                            <div className="statsOverViewWrapper">
                                <img src={fadedArrow} alt="faded-arrow" />
                                <div className="peopleImagesWrapper">
                                    <div className="peopleImage">
                                        <img src={peopleImage} alt="people-image" />
                                    </div>
                                    <div className="peopleImage">
                                        <img src={peopleImage} alt="people-image" />
                                    </div>
                                    <div className="peopleImage">
                                        <img src={peopleImage} alt="people-image" />
                                    </div>
                                    <div className="peopleImage">
                                        <img src={peopleImage} alt="people-image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="forFreelancersSection max-width">
                <h4 className="forFreelancersHeading">BY FREELANCERS. FOR FREELANCERS.</h4>
                <h2 className="forFreelancersTitle">Your Competitive Edge on Upwork</h2>
                <div className="row align-items-center mt-5">
                    <div className="col-12 col-md-6">
                        <ol className='forFreelancersList'>
                            <li className='forFreelancersListItem'>
                                <h2>Apply To Jobs Faster</h2>
                                <p className='forFreelancersListItemDescription'>
                                    Instantly see new Upwork job postings within your Chrome Browser Sidebar so you never miss a new job opportunity!
                                </p>
                            </li>
                            <li className='forFreelancersListItem'>
                                <h2>Apply To Jobs Faster</h2>
                                <p className='forFreelancersListItemDescription'>
                                    Instantly see new Upwork job postings within your Chrome Browser Sidebar so you never miss a new job opportunity!
                                </p>
                            </li>
                            <li className='forFreelancersListItem'>
                                <h2>Apply To Jobs Faster</h2>
                                <p className='forFreelancersListItemDescription'>
                                    Instantly see new Upwork job postings within your Chrome Browser Sidebar so you never miss a new job opportunity!
                                </p>
                            </li>
                        </ol>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <img className='forFreelancersImage' src={forFreelancersImage} alt="for-freelancers-image" />
                    </div>
                </div>
            </div>
        </div>
    )
}