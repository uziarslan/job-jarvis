import React from 'react'
import { Button, styled } from '@mui/material';
import chrome from '../Assets/images/chrome-white-icon.svg';
import peopleImage from '../Assets/images/people.png';

const ActionButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(180deg, #16D3F0 0%, #00AEEF 100%)",
    color: "#F8F8F8",
    borderRadius: 40,
    padding: "8px 19px",
    fontWeight: 600,
    fontSize: 14,
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    border: "1px solid #FFFFFF",
    backdropFilter: "blur(50px)",
    maxWidth: "205px",
    "& img": {
        width: 20,
        height: 20,
    }
}));

export default function Gurantee({ heading, title, description }) {
    return (
        <div className='gurantee-container'>
            <div className='gurantee-content'>
                <h5 className='gurantee-heading'>{heading}</h5>
                <h2 className={`gurantee-title ${!description && 'mb-5'}`}>{title}</h2>
                {description && <p className='gurantee-description'>{description}</p>}
                <div className='row justify-content-center'>
                    <ActionButton startIcon={<img src={chrome} alt="chrome" />}>
                        add to chrome
                    </ActionButton>
                </div>
                <div className="heroStats mb-0">
                    <div className="statsTextWrapper">
                        <h6 className="statsHeading-light">1k+</h6>
                        <p className="statsText-light">freelancers have already joined!</p>
                    </div>
                    <div className="statsOverViewWrapper-light">
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
    )
}