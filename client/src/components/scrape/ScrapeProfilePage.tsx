import React from 'react';
import aiIcon from "../../assets/ai-icon.svg";
import chrome from "../../assets/chrome.svg";
import redoIcon from "../../assets/redo-icon.svg";
import logoIcon from "../../assets/logo-icon.svg";
import rippleBg from "../../assets/ripple-bg.svg";
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

type CustomButtonProps = ButtonProps & {
    component?: React.ElementType;
    href?: string;
    target?: string;
};

const CustomButtonFilled = styled(Button)<CustomButtonProps>(({ theme }) => ({
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

const CustomButtonOutlined = styled(Button)<CustomButtonProps>(({ theme }) => ({
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

const ScrapeProfilePage: React.FC = () => {
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

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
                            <img src={chrome} alt="chrome" />
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
                    <h1 className='bottomWrapperTitle'>Start training job jarvis</h1>
                    <p className='bottomWrapperSubHeading'>Import your upwork profile information
                        to fine-tune your cover letter
                        proposal for each job.</p>
                    <div className='bubbleWrapper'>
                        <p className="bubbleText">Click to import profile(s) button to
                            get started</p>
                    </div>
                </div>
                <div className='authButtonWrapper'>
                    <CustomButtonFilled component="a" href="https://www.upwork.com/freelancers" target='_blank' variant='contained'>Import profile(S)</CustomButtonFilled>
                </div>
            </div>
        </div>
    );
};

export default ScrapeProfilePage;