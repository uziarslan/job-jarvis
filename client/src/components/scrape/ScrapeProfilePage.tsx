import React, { useEffect } from 'react';
import aiIcon from "../../assets/ai-icon.svg";
import chromeIcon from "../../assets/chrome.svg";
import redoIcon from "../../assets/redo-icon.svg";
import logoIcon from "../../assets/logo-icon.svg";
import rippleBg from "../../assets/ripple-bg.svg";
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import axiosInstance from '../../services/axiosInstance';

// Add Chrome types
declare global {
    interface Window {
        chrome: typeof chrome;
    }
}

// Add type definition at the top of the file
interface ScrapeResponse {
    success: boolean;
    data?: any;
    error?: string;
}

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

const ScrapeProfilePage: React.FC = () => {

    const isProfileUrl = (url: string) =>
        /^~[a-zA-Z0-9]{13,}$/.test(url.split('/').pop() || '');

    const sendToBackend = async (data: any) => {
        try {
            const { status } = await axiosInstance.post("/api/v1/profile", data);
            if (status === 201) {
                window.location.reload();
            }
        } catch (err) {
            console.error("❌ Backend error:", err);
        }
    };

    const scrapeProfile = (tabId: number): Promise<ScrapeResponse> =>
        new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: 'scrapeProfile', tabId }, (res) =>
                chrome.runtime.lastError ? reject(new Error(chrome.runtime.lastError.message)) : resolve(res as ScrapeResponse)
            );
        });

    const handleProfileScrape = async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const url = tab?.url;
            const id = tab?.id;

            if (!url) throw new Error('No active tab found');

            if (url.includes('upwork.com/freelancers/') && isProfileUrl(url) && id) {
                const result = await scrapeProfile(id);
                if (result.success) await sendToBackend(result.data);
            } else {
                await chrome.tabs.update(tab.id!, { url: 'https://www.upwork.com/freelancers/' });
            }

            const checkInterval = setInterval(async () => {
                const [t] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (t?.url && isProfileUrl(t.url) && t.id) {
                    clearInterval(checkInterval);
                    await new Promise(r => setTimeout(r, 2000));
                    const result = await scrapeProfile(t.id);
                    if (result.success) await sendToBackend(result.data);
                }
            }, 1000);

            setTimeout(() => clearInterval(checkInterval), 120000);
        } catch (err) {
            console.error('Scrape failed:', err);
        }
    };

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
                    <CustomButtonFilled
                        onClick={handleProfileScrape}
                        variant='contained'
                    >
                        Import profile(S)
                    </CustomButtonFilled>
                </div>
            </div>
        </div>
    );
};

export default ScrapeProfilePage;