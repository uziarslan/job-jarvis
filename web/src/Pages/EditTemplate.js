import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Button, TextField, Autocomplete } from "@mui/material";
import RichTextArea from "../Components/RichTextArea";
import { Link, useParams, useNavigate } from "react-router-dom"
import axiosInstance from "../services/axiosInstance";

export default function EditTemplate() {
    const [formData, setFormData] = useState({
        templateName: "",
        templateDescription: "",
        profile: "",
        templateContent: "",
    });
    const [options, setOptions] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();

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
    }, [id])

    useEffect(() => {
        const fetchTemplateDetails = async () => {
            try {
                const { data, status } = await axiosInstance.get(`/api/v1/template/${id}`);
                if (status === 200) {
                    console.log(data)
                    setFormData(data);
                }
            } catch (error) {
                console.error("Error fetching template details:", error);
            }
        }
        fetchTemplateDetails();
    }, [id]);

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
        try {
            const { data, status } = await axiosInstance.patch(`/api/v1/template/${id}`, formData);
            if (status === 200) {
                alert(data.success)
            }
        } catch (error) {
            console.error("Error updating template:", error.response?.data || error.message);
        }
    };

    const handleDeleteTemplate = async (id) => {
        if (!window.confirm("Are you sure you want to delete this template?")) {
            return;
        }
        try {
            const { data } = await axiosInstance.delete(`/api/v1/template/${id}`);
            if (data.success) {
                navigate("/templates");
            }
        } catch (error) {
            console.error("Error deleting profile:", error.response?.data || error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-width px-5 mb-5">
                <form onSubmit={handleSubmit}>
                    <div className="headingAndButton">
                        <div className="page-header">
                            <h1 className="page-title">Edit Template</h1>
                            <ul className="breadCrumbs">
                                <Link to="/templates">
                                    <p>Templates</p>
                                </Link>
                                <li>Edit Template</li>
                            </ul>
                        </div>
                        <div className="headerActionButtons">
                            <Button
                                className="bg-color custom-border"
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => handleDeleteTemplate(id)}
                                className="bg-transparent text-dark custom-border"
                                variant="contained"
                                type="button"
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                    <div className="row gap-4">
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Template Details</h2>
                            <div className="row gap-3 p-4">
                                <div className="col-12">
                                    <TextField
                                        required
                                        label="Template Name"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        name="templateName"
                                        value={formData.templateName}
                                        onChange={handleInputChange}
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
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Profile</h2>
                            <div className="row gap-3 p-4">
                                <div className="col-12">
                                    <Autocomplete
                                        value={options.find(option => option.id === formData.profile) || null}
                                        onChange={(event, newValue) => {
                                            setFormData(prev => ({
                                                ...prev,
                                                profile: newValue ? newValue.id : ""
                                            }));
                                        }}
                                        options={options}
                                        getOptionLabel={(option) => option.label || ""}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Profile"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                name="profile"
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
                                        key={formData.templateContent}
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