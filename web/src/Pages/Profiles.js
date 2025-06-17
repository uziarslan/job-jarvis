import React, { useState, useEffect } from "react";
import DashNav from "../Components/DashNav";
import { Button } from "@mui/material";
import penIcon from "../Assets/images/pen-icon.svg";
import copyIcon from "../Assets/images/copy-icon.svg";
import trashIcon from "../Assets/images/trash-icon.svg";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function Profiles() {
    // State to manage profiles
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { data } = await axiosInstance.get("/api/v1/profiles");
                setProfiles(data.profiles);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchProfiles();
    }, []);

    // Handle copy profile
    const handleCopyProfile = async (profile) => {
        try {
            const copiedProfile = {
                ...profile,
                profileDetails: {
                    ...profile.profileDetails,
                    profileName: `${profile.profileDetails.profileName} - Copy`,
                },
            };
            const { data, status } = await axiosInstance.post("/api/v1/dublicate", { copiedProfile });
            if (status === 201) {
                setProfiles([...profiles, data]);
            }
        } catch (error) {
            console.error("Error copying profile:", error.response?.data || error.message);
        }
    };

    // Handle delete profile
    const handleDeleteProfile = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/profile/${id}`);
            if (data.success) {
                setProfiles(profiles.filter((profile) => profile._id !== id));
            }
        } catch (error) {
            console.error("Error deleting profile:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <DashNav />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">Profiles</h1>
                        <p className="page-description">
                            Profiles are reusable contexts that can be used in various templates to generate a proposal
                        </p>
                    </div>
                    <Button href="/add/profile" className="bg-color custom-border" variant="contained">
                        Add New Profile
                    </Button>
                </div>
                <div className="row gap-3 p-4">
                    {profiles.length === 0 ? (
                        <div className="col-12">
                            <p>No profiles yet</p>
                        </div>
                    ) : (
                        profiles.map((profile) => (
                            <div key={profile?._id} className="templateCardWrapper col-12">
                                <div className="templateDetails">
                                    <h6 className="templateHeading">{profile?.profileDetails?.profileName}</h6>
                                    <p className="templateDescription">
                                        {profile?.profileDetails?.profileDescription}
                                    </p>
                                </div>
                                <div className="templateActionButton">
                                    <Link to={`/edit/profile/${profile._id}`}>
                                        <button variant="outlined" size="small">
                                            <img src={penIcon} alt="Edit Button" />
                                        </button>
                                    </Link>
                                    <button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleCopyProfile(profile)}
                                    >
                                        <img src={copyIcon} alt="Copy Button" />
                                    </button>
                                    <button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleDeleteProfile(profile._id)}
                                    >
                                        <img src={trashIcon} alt="Delete Button" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}