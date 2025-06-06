import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Button, TextField, Autocomplete } from "@mui/material";
import RichTextArea from "../Components/RichTextArea";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function AddTemplate() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        templateName: "",
        templateDescription: "",
        profile: "",
        templateContent: "",
    });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const { data, status } = await axiosInstance.get("/api/v1/profiles");
                if (status === 200) {
                    const profiles = data.profiles.map((profile) => ({
                        label: profile.profileDetails.profileName,
                        id: profile._id,
                    }));
                    setOptions(profiles);
                }
            } catch (error) {
                console.error("Error fetching user profiles:", error);
            }
        }
        fetchUserProfiles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.templateName || !formData.templateContent) {
            alert("Please fill in Template Name and Template Content");
            return;
        }
        setLoading(true);

        try {
            const { data, status } = await axiosInstance.post("/api/v1/template", formData);
            if (status === 200) {
                alert(data.success);
                setFormData({
                    templateName: "",
                    templateDescription: "",
                    profile: "",
                    templateContent: "",
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Error submitting form. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">Add Template</h1>
                        <ul className="breadCrumbs">
                            <Link to="/templates">
                                <p>Templates</p>
                            </Link>
                            <li>Add Template</li>
                        </ul>
                    </div>
                    <div className="headerActionButtons">
                        <Button
                            className="bg-color custom-border"
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                            href="/templates"
                            className="bg-transparent text-dark custom-border"
                            variant="contained"
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row gap-4">
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Template Details</h2>
                            <div className="row gap-3 p-4">
                                <div className="col-12">
                                    <TextField
                                        label="Template Name"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        name="templateName"
                                        value={formData.templateName}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        label="Template Description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        name="templateDescription"
                                        value={formData.templateDescription}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Profile</h2>
                            <div className="row gap-3 p-4">
                                <div className="col-12">
                                    <Autocomplete
                                        value={formData.profile}
                                        onChange={(event, newValue) => {
                                            setFormData((prev) => ({ ...prev, profile: newValue || "" }));
                                        }}
                                        options={options}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Profile"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                name="profile"
                                                disabled={loading}
                                                required
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Template</h2>
                            <div className="row gap-3 p-4">
                                <div className="col-12">
                                    <RichTextArea
                                        content={formData.templateContent}
                                        setContent={(content) =>
                                            setFormData((prev) => ({ ...prev, templateContent: content }))
                                        }
                                        height={500}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}