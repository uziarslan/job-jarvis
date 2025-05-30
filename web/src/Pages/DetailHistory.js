import React from "react";
import Navbar from "../Components/Navbar";
import { Button } from "@mui/material";
import { Link } from "react-router-dom"
import trashIcon from "../Assets/images/trash-icon.svg";

export default function DetailHistory() {

    return (
        <>
            <Navbar />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">MERN Stack Developer Needed for Interactive Dashboard with AI Integration</h1>
                        <ul className="breadCrumbs">
                            <Link to="/history">
                                <p>History</p>
                            </Link>
                            <li>Proposal Details</li>
                        </ul>
                    </div>
                    <div className="headerActionButtons">
                        <Button
                            className="bg-transparent text-dark custom-border"
                            variant="contained"
                        >
                            <img src={trashIcon} alt="Delete Button" />
                        </Button>
                    </div>
                </div>
                <div className="sideBySide">
                    <div className="inputsHeadingAndBodyContainer">
                        <div className="headingWithDate">
                            <h2 className="historyHeading">MERN Stack Developer Needed for Interactive Dashboard with AI Integration</h2>
                            <p className="historyDate">Submitted: 03/23/2025, 3:55:01 am</p>
                        </div>
                        <div className="p-4">
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </div>
                    </div>
                    <div className="jobdetails">
                        <div className="jobTitleAndLink">
                            <h2>MERN Stack Developer Needed for Interactive Dashboard with AI Integration</h2>
                            <button className="viewOnUpworkButton">View on Upwork</button>
                        </div>
                        <div className="dateForPosted">
                            <p className="staticHeading">Posted</p>
                            <p className="variableDate">Mar 22, 2025</p>
                        </div>
                        <div className="jobDescriptionWrapper">
                            <h2 className="jobDescriptionHeading">Job Description</h2>
                            <div className="position-relative">
                                <p className="jobDiscriptionText">We are seeking an experienced MERN stack developer to create an interactive dashboard featuring AI agent integration. The ideal candidate should have a strong understanding of MongoDB, Express.js, React, and Node.js, along with experience in developing user-friendly interfaces and integrating AI functionalities. Your primary responsibility will be to design and implement a responsive dashboard that provides real-time data visualization and a seamless user experience. If you are passionate about cutting-edge technologies and have a proven track record in dashboard development, we would love to hear from you! Current progress: Frontend and prototype is 70% ready the rest should be carried by developers. Timeline: 3 weeks ***Please share relevant experience***
                                </p>
                                <div className="showMoreBg"></div>
                            </div>
                            <button className="showMoreBtn">Show More</button>
                        </div>
                        <div className="tagsWrapper">
                            <div className="customTags">React</div>
                            <div className="customTags">Web Development</div>
                            <div className="customTags">React</div>
                            <div className="customTags">Web Decelopment</div>
                            <div className="customTags">React</div>
                            <div className="customTags">Web Development</div>
                            <div className="customTags">React</div>
                            <div className="customTags">Web Decelopment</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}