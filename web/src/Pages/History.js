import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Button } from "@mui/material";
import trashIcon from "../Assets/images/trash-icon.svg";

export default function History() {
    // State to manage proposal history
    const [history, setHistory] = useState([
        {
            id: "1",
            title: "MERN Stack Developer Needed for Interactive Dashboard with AI Integration",
            submitted: "03/23/2025, 3:55:01 am",
        },
    ]);

    // Handle delete proposal
    const handleDeleteProposal = (id) => {
        setHistory(history.filter((proposal) => proposal.id !== id));
    };

    return (
        <>
            <Navbar />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">History</h1>
                        <p className="page-description">Browse through history of proposals you have created</p>
                    </div>
                </div>
                {history.length === 0 ? (
                    <div className="row gap-3 p-4">
                        <p>No history yet</p>
                    </div>
                ) : (
                    history.map((proposal) => (
                        <div key={proposal.id} className="templateCardWrapper">
                            <div className="templateDetails">
                                <h6 className="templateHeading">{proposal.title}</h6>
                                <p className="templateDescription">Submitted: {proposal.submitted}</p>
                            </div>
                            <div className="templateActionButton">
                                <Button
                                    href="/history/details"
                                    className="bg-color custom-border"
                                    variant="contained"
                                >
                                    Details
                                </Button>
                                <button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleDeleteProposal(proposal.id)}
                                >
                                    <img src={trashIcon} alt="Delete Button" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}