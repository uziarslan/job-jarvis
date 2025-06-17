import React from 'react';
import aiIcon from "../../assets/ai-icon.svg";
import chromeIcon from "../../assets/chrome.svg";
import redoIcon from "../../assets/redo-icon.svg";
import logoIcon from "../../assets/logo-icon.svg";
import rippleBg from "../../assets/ripple-bg.svg";
import { Button, CircularProgress, Link } from '@mui/material';
import { styled } from '@mui/system';
import authService from '../../services/authService';

// Add Chrome types
declare global {
    interface Window {
        chrome: typeof chrome;
    }
}

const CustomButtonFilled = styled(Button)(({ theme }) => ({
    background: "linear-gradient(90deg, #00AEEF 0%, #16D3F0 100%)",
    width: "100%",
    padding: "14.5px 0",
    borderRadius: "8px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "100%",
    letterSpacing: "3%",
    textTransform: "capitalize"
}));

const CustomButtonOutlined = styled(Button)(({ theme }) => ({
    background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, #00AEEF 0%, #16D3F0 100%) border-box",
    border: "1px solid transparent",
    width: "100%",
    padding: "14.5px 0",
    borderRadius: "8px",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "100%",
    letterSpacing: "3%",
    textTransform: "capitalize",
    color: "#00AEEF"
}));

const Upgrade: React.FC<{ error: string }> = ({ error }) => {
    const handleLogout = () => {
        authService.logout();
    }
    return (
        <div className="outerSpace">
            <div className="innerSpace">
                <img className="rippleBg" src={rippleBg} alt="ripple-bg" />
                <div className="displayArea">
                    <div className="elementRow">
                        <div className="generateWrapper">
                            <img src={aiIcon} alt="ai-icon" />
                            <p className="aiIconText">Generate Proposal</p>
                        </div>
                    </div>
                    <div className="elementRow">
                        <div className="whiteBgWrapper">
                            <img src={chromeIcon} alt="chrome" />
                        </div>
                        <img src={redoIcon} alt="redo-icon" />
                        <div className="whiteBgWrapper">
                            <img src={logoIcon} alt="logo-icon" />
                        </div>
                    </div>
                    <div className="elementRow">
                        <div className="generateWrapper">
                            <img src={aiIcon} alt="ai-icon" />
                            <p className="aiIconText">Job Jarvis Chrome Extension</p>
                        </div>
                    </div>
                </div>
                <div className="bottomWrapper">
                    <h1 className='bottomWrapperTitle'>Upgrade your account</h1>
                    <p className='bottomWrapperSubHeading'>Upgrade your account to get access to all features</p>
                    <div className='bubbleWrapper'>
                        <p className="bubbleText">{error}</p>
                    </div>
                </div>
                <div className='authButtonWrapper'>
                    <Link
                        href={`${process.env.REACT_APP_FRONTEND_URL}/pricing`}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                    >
                        <CustomButtonFilled
                            loadingIndicator={
                                <CircularProgress sx={{ color: "#fff" }} size={24} />
                            }
                            variant='contained'
                        >
                            Upgrade
                        </CustomButtonFilled>
                    </Link>
                    <CustomButtonOutlined onClick={handleLogout} variant="outlined">Logout</CustomButtonOutlined>
                </div>
            </div>
        </div>
    );
};

export default Upgrade;