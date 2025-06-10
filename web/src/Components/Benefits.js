import React from 'react'
import demo from "../Assets/images/demo.jpg"
import { Button, styled } from '@mui/material';
import chrome from '../Assets/images/chrome-white-icon.svg';

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
    maxWidth: "205px",
    "& img": {
        width: 20,
        height: 20,
    }
}));

export default function Benefits() {
    return (
        <div className="max-width">
            <div className='benefits-container'>
                <h5>Benefits</h5>
                <h2>Power packed features to help you save time on Upwork</h2>
                <div className='row align-items-center'>
                    <div className='col-6'>
                        <img className='benefits-image' src={demo} alt="demo" />
                    </div>
                    <div className='col-6'>
                        <h5 className='benefits-heading'>FIND JOBS FASTER</h5>
                        <h2 className='benefits-title'>Stay Ahead of New Opportunities</h2>
                        <p className='benefits-description'>With Job Jarvis, you’ll see Upwork jobs as soon as they're posted—right while you're actively browsing. Our smart Chrome extension keeps an eye on your saved job searches whenever you're logged into Upwork with your browser open.</p>
                        <br />
                        <p className='benefits-description'>As soon as a relevant new opportunity appears, you'll get an instant notification right in your sidebar, letting you apply immediately without switching tabs or losing your workflow.</p>
                        <ActionButton startIcon={<img src={chrome} alt="chrome" />}>
                            add to chrome
                        </ActionButton>
                    </div>
                </div>
                <div className='row align-items-center gap-5 my-5'>
                    <div className='col-12'>
                        <div className="card-max-width">
                            <h5 className='text-center benefits-heading'>INTELLIGENT CHROME EXTENSION</h5>
                            <h2 className='text-center benefits-title'>One Button. One-click. That's it!</h2>
                            <p className='text-center benefits-description'>The PouncerAI Chrome Extension instantly detects the job details on Upwork, eliminating the need to copy and paste into ChatGPT. So when you are ready to generate a Cover Letter, just click the button and let the AI system create a custom-tailored cover letter for you.</p>
                            <ActionButton startIcon={<img src={chrome} alt="chrome" />}>
                                add to chrome
                            </ActionButton>
                        </div>
                    </div>
                    <div className='col-12'>
                        <img className='benefits-image' src={demo} alt="demo" />
                    </div>
                </div>
                <div className='row align-items-center gap-5 my-5'>
                    <div className='col-12'>
                        <div className="card-max-width">
                            <h5 className='text-center benefits-heading'>INTELLIGENT CHROME EXTENSION</h5>
                            <h2 className='text-center benefits-title-center'>Create Winning Proposals with Easily Customizable Templates</h2>
                            <p className='text-center benefits-description'>With Job Jarvis, you can generate attention-grabbing proposals in seconds. By leveraging your Upwork Profile and the client’s job description, Job Jarvis Templates automatically deliver a tailored, persuasive cover letter designed to win clients.</p>
                            <br />
                            <p className="text-center benefits-description">But that’s not all—Job Jarvis also lets you create and customize your own AI-driven proposal templates to suit your unique style and needs. Start winning more jobs with less effort today!</p>
                            <ActionButton startIcon={<img src={chrome} alt="chrome" />}>
                                add to chrome
                            </ActionButton>
                        </div>
                    </div>
                    <div className='col-12'>
                        <img className='benefits-image' src={demo} alt="demo" />
                    </div>
                </div>
                <div className='row align-items-center my-5'>
                    <div className='col-6'>
                        <h5 className='benefits-heading'>UNICODE TOOLBAR</h5>
                        <h2 className='benefits-title'>Make your Proposals Stand Out with the Upstyler Toolbar</h2>
                        <p className='benefits-description'>Turn your proposals into eye-catching visual masterpieces with the Upstyler Toolbar. Specially designed for embedding Unicode characters—like bold, italics, bullets, and emojis—this toolbar helps add a touch of flair that will captivate a client's attention and make your cover letter unforgettable.</p>
                        <ActionButton startIcon={<img src={chrome} alt="chrome" />}>
                            add to chrome
                        </ActionButton>
                    </div>
                    <div className='col-6'>
                        <img className='benefits-image' src={demo} alt="demo" />
                    </div>
                </div>
                <div className='row align-items-center my-5'>
                    <div className='col-6'>
                        <img className='benefits-image' src={demo} alt="demo" />
                    </div>
                    <div className='col-6'>
                        <h5 className='benefits-heading'>TEAM FEATURES</h5>
                        <h2 className='benefits-title'>Get jobs for everyone on your team</h2>
                        <p className='benefits-description'>Job Jarvis makes it easy for you to manage multiple freelancer profiles on Upwork. Just add your freelancer’s profile and then use PouncerAI to send custom-tailored proposals for individual freelancers.</p>
                        <br />
                        <p className="benefits-description">Generate more business for your agency with Job Jarvis.</p>
                        <ActionButton startIcon={<img src={chrome} alt="chrome" />}>
                            add to chrome
                        </ActionButton>
                    </div>
                </div>
            </div>
        </div>
    )
}