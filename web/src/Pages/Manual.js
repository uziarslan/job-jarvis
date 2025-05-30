import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { Button, TextField } from "@mui/material";

export default function Manual() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        jobUrl: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.jobTitle || !formData.jobDescription) {
            alert('Please fill in Job Title and Job Description');
            return;
        }
        setLoading(true);
        // Simulate API call or processing
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setLoading(false);
            // Reset form after submission
            setFormData({
                jobTitle: '',
                jobDescription: '',
                jobUrl: ''
            });
        }, 1000);
    };

    return (
        <>
            <Navbar />
            <div className="max-width px-5">
                <div className="headingAndButton">
                    <div className="page-header">
                        <h1 className="page-title">Enter a Manual Job</h1>
                        <p className="page-description">Enter a Manual Job to generate a proposal</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="row max-width-852 gap-3">
                    <div className="col-12">
                        <TextField
                            label="Job Title (e.g. Mobile App for Pet Store)"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>
                    <div className="col-12">
                        <TextField
                            label="Job Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>
                    <div className="col-12">
                        <TextField
                            label="Job URL (optional) (e.g. https://www.upwork.com/jobs...)"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            name="jobUrl"
                            value={formData.jobUrl}
                            onChange={handleInputChange}
                            disabled={loading}
                        />
                    </div>
                    <div className="col-12">
                        <Button
                            type="submit"
                            disabled={loading}
                            variant="contained"
                            className="generateProposalBtn custom-border"
                        >
                            Generate Proposal
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}