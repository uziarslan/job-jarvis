import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom"
import trashIcon from "../Assets/images/trash-icon.svg";
import { useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import DashNav from "../Components/DashNav";

function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

export default function DetailHistory() {
    const { id } = useParams();
    const [proposal, setProposal] = useState({});

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const { status, data } = await axiosInstance.get(`/api/v1/history/${id}`);
                if (status === 200) {
                    setProposal(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchProposal();
    }, [id]);

    return (
        <>
            <DashNav />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">{proposal?.jobTitle}</h1>
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
                            <h2 className="historyHeading">{proposal?.jobTitle}</h2>
                            <p className="historyDate">Submitted: {formatDate(proposal?.createdAt)}</p>
                        </div>
                        <div className="p-4">
                            {proposal?.content?.split('\n').map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </div>
                    <div className="jobdetails">
                        <div className="jobTitleAndLink">
                            <h2>{proposal?.jobTitle}</h2>
                            <button className="viewOnUpworkButton">View on Upwork</button>
                        </div>
                        <div className="dateForPosted">
                            <p className="staticHeading">Posted</p>
                            <p className="variableDate">{proposal?.jobPosted}</p>
                        </div>
                        <div className="jobDescriptionWrapper">
                            <h2 className="jobDescriptionHeading">Job Description</h2>
                            <div className="position-relative">
                                <p className="jobDiscriptionText">{proposal?.jobDescription}
                                </p>
                                <div className="showMoreBg"></div>
                            </div>
                            <button className="showMoreBtn">Show More</button>
                        </div>
                        <div className="tagsWrapper">
                            {proposal?.jobSkills?.map((tag) => (
                                <div className="customTags">{tag}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}