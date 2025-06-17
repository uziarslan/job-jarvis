import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import trashIcon from "../Assets/images/trash-icon.svg";
import axiosInstance from "../services/axiosInstance";
import DashNav from "../Components/DashNav";

// Utility function to format MongoDB date string
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

export default function History() {
    // State to manage proposal history
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { status, data } = await axiosInstance.get("/api/v1/history");
                if (status === 200) {
                    setHistory(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchHistory();
    }, []);

    // Handle delete proposal
    const handleDeleteProposal = (id) => {
        setHistory(history.filter((proposal) => proposal._id !== id));
    };

    return (
        <>
            <DashNav />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">History</h1>
                        <p className="page-description">Browse through history of proposals you have created</p>
                    </div>
                </div>
                {history?.length === 0 ? (
                    <div className="row gap-3 p-4">
                        <p>No history yet</p>
                    </div>
                ) : (
                    history?.map((proposal) => (
                        <div key={proposal._id} className="templateCardWrapper">
                            <div className="templateDetails">
                                <h6 className="templateHeading">{proposal.jobTitle}</h6>
                                <p className="templateDescription">Submitted: {formatDate(proposal.createdAt)}</p>
                            </div>
                            <div className="templateActionButton">
                                <Button
                                    href={`/history/details/${proposal._id}`}
                                    className="bg-color custom-border"
                                    variant="contained"
                                >
                                    Details
                                </Button>
                                <button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleDeleteProposal(proposal._id)}
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