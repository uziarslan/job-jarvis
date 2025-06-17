import React, { useState, useEffect } from "react";
import DashNav from "../Components/DashNav";
import { Button } from "@mui/material";
import penIcon from "../Assets/images/pen-icon.svg";
import copyIcon from "../Assets/images/copy-icon.svg";
import trashIcon from "../Assets/images/trash-icon.svg";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export default function Templates() {
    // State to manage templates
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        const fecthAllTemplates = async () => {
            try {
                const { data, status } = await axiosInstance.get("/api/v1/templates");
                if (status === 200) {
                    setTemplates(data);
                }
            } catch (error) {
                console.error("Error fetching templates:", error);
            }
        }
        fecthAllTemplates();
    }, []);

    // Handle copy template
    const handleCopyTemplate = async (template) => {
        try {
            const copiedTemplate = {
                ...template,
                templateName: `${template.templateName} - Copy`,
            }

            const { data, status } = await axiosInstance.post("/api/v1/t/dublicate", { copiedTemplate })
            if (status === 201) {
                setTemplates([...templates, data]);
            }
        } catch (error) {
            console.error("Error copying template:", error.response?.data || error.message);
        }
    };

    // Handle delete template
    const handleDeleteTemplate = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/template/${id}`);
            if (data.success) {
                setTemplates(templates.filter((template) => template._id !== id));
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
                        <h1 className="page-title">Templates</h1>
                        <p className="page-description">Add or manage templates</p>
                    </div>
                    <Button href="/add/template" className="bg-color custom-border" variant="contained">
                        Add Template
                    </Button>
                </div>
                {templates?.length === 0 ? (
                    <div className="row gap-3 p-4">
                        <p>No templates yet</p>
                    </div>
                ) : (
                    templates?.map((template) => (
                        <div key={template._id} className="templateCardWrapper">
                            <div className="templateDetails">
                                <h6 className="templateHeading">{template?.templateName}</h6>
                                <p className="templateDescription">{template?.templateDescription}</p>
                            </div>
                            <div className="templateActionButton">
                                <Link to={`/edit/template/${template._id}`}>
                                    <button variant="outlined" size="small">
                                        <img src={penIcon} alt="Edit Button" />
                                    </button>
                                </Link>
                                <button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleCopyTemplate(template)}
                                >
                                    <img src={copyIcon} alt="Copy Button" />
                                </button>
                                <button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleDeleteTemplate(template._id)}
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