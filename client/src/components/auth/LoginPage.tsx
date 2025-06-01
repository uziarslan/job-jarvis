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

const LoginPage: React.FC = () => {
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
          <h1 className='bottomWrapperTitle'>Get Started with job jarvis</h1>
          <p className='bottomWrapperSubHeading'>Ready to start generating proposals?
            Then login below</p>
          <div className='bubbleWrapper'>
            <div className="filledBubble">
              <p className='filledBubbleText'>New user</p>
            </div>
            <div className='outlineBubble'>
              <p className='outlineBubbleText'>Existing user</p>
            </div>
          </div>
        </div>
        <div className='authButtonWrapper'>
          <div className='buttonWithDescription'>
            <CustomButtonFilled component="a" href={`${frontendUrl}/signup`} target='_blank' variant='contained'>Get Started for free</CustomButtonFilled>
            <p className='buttonDescription'>First 10 free proposals</p>
          </div>
          <CustomButtonOutlined component="a" href={`${frontendUrl}/login`} target='_blank' variant="outlined">Sign in</CustomButtonOutlined>
        </div>
        <p className="support">If you need help? <a href="mailto:support@jobjarvis.com">Contact support</a></p>
      </div>
    </div>
  );
};

export default LoginPage;