import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Button, TextField, Autocomplete, Modal, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import trashIconLarge from "../Assets/images/trash-icon-large.svg";
import penIconLarge from "../Assets/images/pen-icon-large.svg";
import eyeIconLarge from "../Assets/images/eye-icon-large.svg";
import axiosInstance from "../services/axiosInstance";

const options = ['Upwork', 'My Website', 'Blog/Podcast', 'Video Channel', 'Portfolio Page', 'Github (Code Examples)', 'Dribble', 'Behance', 'Other'];

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: '95vh',
    overflowY: 'scroll',
};

export default function AddProfile() {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({
        profileDetails: {
            profileName: '',
            profileDescription: '',
        },
        personalDetails: {
            firstName: '',
            lastName: '',
            location: '',
            profession: '',
            years: '',
            rate: '',
            skills: [],
        },
        profileSummary: {
            profileSummary: '',
        },
        certifications: [],
        education: [],
        employmentHistory: [],
        workHistory: [],
        portfolioLinks: [],
        projects: [],
    });

    useEffect(() => {
        const fetchSkills = async () => {
            const { data } = await axiosInstance.get("/api/v1/skills")
            setSkills(data)
        }
        fetchSkills()
    }, [])

    // Modal states
    const [openModal, setOpenModal] = useState({ type: '', mode: '', index: null });
    const [modalData, setModalData] = useState({
        title: '', company: '', description: '',
        paymentType: '', amount: '', rating: '', testimonial: '', imageUrl: '',
        projectName: '', projectDescription: '', projectLink: '', skills: [],
    });

    // Handle input changes for profile and personal details
    const handleInputChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    // Handle certifications
    const addCertification = () => {
        setFormData(prev => ({
            ...prev,
            certifications: [...prev.certifications, { name: '', description: '' }],
        }));
    };

    const updateCertification = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.map((cert, i) =>
                i === index ? { ...cert, [field]: value } : cert
            ),
        }));
    };

    const deleteCertification = (index) => {
        setFormData(prev => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index),
        }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', school: '' }],
        }));
    };

    const updateEducation = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const deleteEducation = (index) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index),
        }));
    };

    // Handle portfolio links
    const addPortfolioLink = () => {
        setFormData(prev => ({
            ...prev,
            portfolioLinks: [...prev.portfolioLinks, { type: '', url: '' }],
        }));
    };

    const updatePortfolioLink = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            portfolioLinks: prev.portfolioLinks.map((link, i) =>
                i === index ? { ...link, [field]: value } : link
            ),
        }));
    };

    const deletePortfolioLink = (index) => {
        setFormData(prev => ({
            ...prev,
            portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index),
        }));
    };

    // Modal handlers
    const openAddModal = (type) => {
        setOpenModal({ type, mode: 'add', index: null });
        setModalData({
            title: '', company: '', description: '',
            paymentType: '', amount: '', rating: '', testimonial: '', imageUrl: '',
            projectName: '', projectDescription: '', projectLink: '', skills: [],
        });
    };

    const openEditModal = (type, index) => {
        setOpenModal({ type, mode: 'edit', index });
        setModalData(formData[type][index]);
    };

    const openViewModal = (type, index) => {
        setOpenModal({ type, mode: 'view', index });
        setModalData(formData[type][index]);
    };

    const handleModalSave = (e) => {
        e.preventDefault();


        if (openModal.mode === 'add') {
            setFormData(prev => ({
                ...prev,
                [openModal.type]: [...prev[openModal.type], modalData],
            }));
        } else if (openModal.mode === 'edit') {
            setFormData(prev => ({
                ...prev,
                [openModal.type]: prev[openModal.type].map((item, i) =>
                    i === openModal.index ? modalData : item
                ),
            }));
        }
        setOpenModal({ type: '', mode: '', index: null });
        setModalData({
            title: '', company: '', description: '',
            paymentType: '', amount: '', rating: '', testimonial: '', imageUrl: '',
            projectName: '', projectDescription: '', projectLink: '', skills: [],
        });
    };

    const handleDelete = (type, index) => {
        setFormData(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index),
        }));
    };

    const handleModalInputChange = (field, value) => {
        setModalData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post("/api/v1/profile", formData)
            if (data.success) {
                setFormData({
                    profileDetails: {
                        profileName: '',
                        profileDescription: '',
                    },
                    personalDetails: {
                        firstName: '',
                        lastName: '',
                        location: '',
                        profession: '',
                        years: '',
                        rate: '',
                        skills: [],
                    },
                    profileSummary: {
                        profileSummary: '',
                    },
                    certifications: [],
                    education: [],
                    employmentHistory: [],
                    workHistory: [],
                    portfolioLinks: [],
                    projects: [],
                });
                setOpenModal({ type: '', mode: '', index: null });
                setModalData({
                    title: '', company: '', description: '',
                    paymentType: '', amount: '', rating: '', testimonial: '', imageUrl: '',
                    projectName: '', projectDescription: '', projectLink: '', skills: [],
                });
            }
        } catch (error) {
            console.error("Error creating profile:", error);
        }
    }

    const renderModalContent = () => (
        <Box sx={modalStyle}>
            <form onSubmit={handleModalSave}>
                <h2>{openModal.mode === 'add' ? 'Add' : openModal.mode === 'edit' ? 'Edit' : 'View'} {openModal.type === 'employmentHistory' ? 'Employment' : openModal.type === 'workHistory' ? 'Work History' : 'Project'}</h2>
                {openModal.type === 'employmentHistory' && (
                    <>
                        <TextField
                            label="Title"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.title}
                            onChange={(e) => handleModalInputChange('title', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Company"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.company}
                            onChange={(e) => handleModalInputChange('company', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.description}
                            onChange={(e) => handleModalInputChange('description', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    </>
                )}
                {openModal.type === 'workHistory' && (
                    <>
                        <TextField
                            required
                            label="Title"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.title}
                            onChange={(e) => handleModalInputChange('title', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                        <FormControl fullWidth margin="normal" className="w-100 custom-border-shadow">
                            <InputLabel>Payment Type</InputLabel>
                            <Select
                                required
                                value={modalData.paymentType}
                                onChange={(e) => handleModalInputChange('paymentType', e.target.value)}
                                disabled={openModal.mode === 'view'}
                                label="Payment Type"
                            >
                                <MenuItem value="Fixed">Fixed</MenuItem>
                                <MenuItem value="Hourly">Hourly</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Amount"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.amount}
                            onChange={(e) => handleModalInputChange('amount', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Rating"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.rating}
                            onChange={(e) => handleModalInputChange('rating', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.description}
                            onChange={(e) => handleModalInputChange('description', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Testimonial"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.testimonial}
                            onChange={(e) => handleModalInputChange('testimonial', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Image URL"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.imageUrl}
                            onChange={(e) => handleModalInputChange('imageUrl', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                    </>
                )}
                {openModal.type === 'projects' && (
                    <>
                        <TextField
                            required
                            label="Project Name"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.projectName}
                            onChange={(e) => handleModalInputChange('projectName', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Project Description"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.projectDescription}
                            onChange={(e) => handleModalInputChange('projectDescription', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Project Link (Optional)"
                            variant="outlined"
                            className="w-100 custom-border-shadow"
                            value={modalData.projectLink}
                            onChange={(e) => handleModalInputChange('projectLink', e.target.value)}
                            disabled={openModal.mode === 'view'}
                            fullWidth
                            margin="normal"
                        />
                        <Autocomplete
                            multiple
                            freeSolo
                            className="w-100 custom-border-shadow"
                            id="tags-outlined"
                            options={skills}
                            filterSelectedOptions
                            value={modalData.skills}
                            onChange={(e, value) => handleModalInputChange('skills', value)}
                            disabled={openModal.mode === 'view'}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Skills"
                                    placeholder="Skills"
                                />
                            )}
                        />
                    </>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button
                        type="button"
                        className="bg-transparent text-dark custom-border"
                        variant="contained"
                        onClick={() => setOpenModal({ type: '', mode: '', index: null })}
                    >
                        {openModal.mode === 'view' ? 'Close' : 'Cancel'}
                    </Button>
                    {openModal.mode !== 'view' && (
                        <Button
                            className="bg-color custom-border"
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                    )}
                </Box>
            </form>
        </Box>
    );

    return (
        <>
            <Navbar />
            <div className="max-width px-5">
                <form onSubmit={handleSubmit}>
                    <div className="headingAndButton">
                        <div className="page-header">
                            <h1 className="page-title">New Profile</h1>
                            <ul className="breadCrumbs">
                                <Link to="/profiles">
                                    <p>Profiles</p>
                                </Link>
                                <li>New Profile</li>
                            </ul>
                        </div>
                        <div className="headerActionButtons">
                            <Button
                                className="bg-color custom-border"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                type="button"
                                href="/profiles"
                                className="bg-transparent text-dark custom-border"
                                variant="contained"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                    <div className="row gap-4">
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Profile Details</h2>
                            <div className="row gap-3 p-4">
                                <div className="col-12">
                                    <TextField
                                        required
                                        label="Profile Name"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.profileDetails.profileName}
                                        onChange={(e) => handleInputChange('profileDetails', 'profileName', e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        label="Profile Description"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.profileDetails.profileDescription}
                                        onChange={(e) => handleInputChange('profileDetails', 'profileDescription', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Personal Details</h2>
                            <div className="row gap-3 p-4">
                                <div className="col">
                                    <TextField
                                        required
                                        label="First Name"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.personalDetails.firstName}
                                        onChange={(e) => handleInputChange('personalDetails', 'firstName', e.target.value)}
                                    />
                                </div>
                                <div className="col">
                                    <TextField
                                        required
                                        label="Last Name"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.personalDetails.lastName}
                                        onChange={(e) => handleInputChange('personalDetails', 'lastName', e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <TextField
                                        label="Location"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.personalDetails.location}
                                        onChange={(e) => handleInputChange('personalDetails', 'location', e.target.value)}
                                    />
                                </div>
                                <div className="col-8">
                                    <TextField
                                        label="Profession"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.personalDetails.profession}
                                        onChange={(e) => handleInputChange('personalDetails', 'profession', e.target.value)}
                                    />
                                </div>
                                <div className="col">
                                    <TextField
                                        label="Years"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.personalDetails.years}
                                        onChange={(e) => handleInputChange('personalDetails', 'years', e.target.value)}
                                    />
                                </div>
                                <div className="col">
                                    <TextField
                                        label="Rate"
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.personalDetails.rate}
                                        onChange={(e) => handleInputChange('personalDetails', 'rate', e.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <Autocomplete
                                        multiple
                                        freeSolo
                                        className="w-100 custom-border-shadow"
                                        id="tags-outlined"
                                        options={skills}
                                        filterSelectedOptions
                                        value={formData.personalDetails.skills}
                                        onChange={(e, value) => handleInputChange('personalDetails', 'skills', value)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Skills"
                                                placeholder="Skills"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <h2 className="containerHeading">Profile Summary</h2>
                            <div className="row gap-3 p-4">
                                <div className="col">
                                    <TextField
                                        required
                                        label="Profile Summary"
                                        multiline
                                        rows={9}
                                        variant="outlined"
                                        className="w-100 custom-border-shadow"
                                        value={formData.profileSummary.profileSummary}
                                        onChange={(e) => handleInputChange('profileSummary', 'profileSummary', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <div className="boxHeadingWithButton">
                                <h2 className="boxHeading">Certifications</h2>
                                <button type="button" className="addFieldButton" onClick={addCertification}>
                                    Add Certification
                                </button>
                            </div>
                            {formData.certifications.length === 0 ? (
                                <div className="row gap-3 p-4">
                                    <p>No certifications yet</p>
                                </div>
                            ) : (
                                formData.certifications.map((cert, index) => (
                                    <div key={index} className="row gap-3 p-4 align-items-center">
                                        <div className="col-4">
                                            <TextField
                                                required
                                                label="Certification Name"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                value={cert.name}
                                                onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextField
                                                label="Certification Description"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                value={cert.description}
                                                onChange={(e) => updateCertification(index, 'description', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button type="button" className="removeFieldButton" onClick={() => deleteCertification(index)}>
                                                <img src={trashIconLarge} alt="Remove Field Button" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <div className="boxHeadingWithButton">
                                <h2 className="boxHeading">Education</h2>
                                <button type="button" className="addFieldButton" onClick={addEducation}>
                                    Add Education
                                </button>
                            </div>
                            {formData.education.length === 0 ? (
                                <div className="row gap-3 p-4">
                                    <p>No education yet</p>
                                </div>
                            ) : (
                                formData.education.map((edu, index) => (
                                    <div key={index} className="row gap-3 p-4 align-items-center">
                                        <div className="col-4">
                                            <TextField
                                                required
                                                label="Degree"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                value={edu.degree}
                                                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextField
                                                label="School"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                value={edu.school}
                                                onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button type="button" className="removeFieldButton" onClick={() => deleteEducation(index)}>
                                                <img src={trashIconLarge} alt="Remove Field Button" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <div className="boxHeadingWithButton">
                                <h2 className="boxHeading">Employment History</h2>
                                <button type="button" className="addFieldButton" onClick={() => openAddModal('employmentHistory')}>
                                    Add New Employment
                                </button>
                            </div>
                            {formData.employmentHistory.length === 0 ? (
                                <div className="row gap-3 p-4">
                                    <p>No employment history yet</p>
                                </div>
                            ) : (
                                formData.employmentHistory.map((emp, index) => (
                                    <div key={index} className="row gap-3 p-4 align-items-center">
                                        <div className="col-md-9 col-lg-10">
                                            <h2 className="employmentHistoryText">{emp.title}</h2>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="removeFieldButton" onClick={() => openEditModal('employmentHistory', index)}>
                                                <img src={penIconLarge} alt="Update Button" />
                                            </button>
                                            <button type="button" className="removeFieldButton" onClick={() => openViewModal('employmentHistory', index)}>
                                                <img src={eyeIconLarge} alt="Preview Button" />
                                            </button>
                                            <button type="button" className="removeFieldButton" onClick={() => handleDelete('employmentHistory', index)}>
                                                <img src={trashIconLarge} alt="Delete Button" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <div className="boxHeadingWithButton">
                                <h2 className="boxHeading">Upwork Work History</h2>
                                <button type="button" className="addFieldButton" onClick={() => openAddModal('workHistory')}>
                                    Add New Work History
                                </button>
                            </div>
                            {formData.workHistory.length === 0 ? (
                                <div className="row gap-3 p-4">
                                    <p>No Upwork work history yet</p>
                                </div>
                            ) : (
                                formData.workHistory.map((work, index) => (
                                    <div key={index} className="row gap-3 p-4">
                                        <div className="col-md-9 col-lg-10">
                                            <h2 className="employmentHistoryText">{work.title}</h2>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="removeFieldButton" onClick={() => openEditModal('workHistory', index)}>
                                                <img src={penIconLarge} alt="Update Button" />
                                            </button>
                                            <button type="button" className="removeFieldButton" onClick={() => openViewModal('workHistory', index)}>
                                                <img src={eyeIconLarge} alt="Preview Button" />
                                            </button>
                                            <button type="button" className="removeFieldButton" onClick={() => handleDelete('workHistory', index)}>
                                                <img src={trashIconLarge} alt="Delete Button" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <div className="boxHeadingWithButton">
                                <h2 className="boxHeading">Portfolio Links</h2>
                                <button type="button" className="addFieldButton" onClick={addPortfolioLink}>
                                    Add Portfolio Links
                                </button>
                            </div>
                            {formData.portfolioLinks.length === 0 ? (
                                <div className="row gap-3 p-4">
                                    <p>No portfolio links yet</p>
                                </div>
                            ) : (
                                formData.portfolioLinks.map((link, index) => (
                                    <div key={index} className="row gap-3 p-4 align-items-center">
                                        <div className="col-4">
                                            <Autocomplete
                                                className="w-100 custom-border-shadow"
                                                options={options}
                                                value={link.type}
                                                onChange={(e, value) => updatePortfolioLink(index, 'type', value)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        required
                                                        {...params}
                                                        label="Portfolio Type"
                                                        variant="outlined"
                                                        className="w-100 custom-border-shadow"
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextField
                                                required
                                                label="Portfolio URL"
                                                variant="outlined"
                                                className="w-100 custom-border-shadow"
                                                value={link.url}
                                                onChange={(e) => updatePortfolioLink(index, 'url', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button type="button" className="removeFieldButton" onClick={() => deletePortfolioLink(index)}>
                                                <img src={trashIconLarge} alt="Remove Field Button" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="inputsHeadingAndBodyContainer">
                            <div className="boxHeadingWithButton">
                                <h2 className="boxHeading">Project Experience</h2>
                                <button type="button" className="addFieldButton" onClick={() => openAddModal('projects')}>
                                    Add New Project
                                </button>
                            </div>
                            {formData.projects.length === 0 ? (
                                <div className="row gap-3 p-4">
                                    <p>No project experience yet</p>
                                </div>
                            ) : (
                                formData.projects.map((project, index) => (
                                    <div key={index} className="row gap-3 p-4 align-items-center">
                                        <div className="col-md-9 col-lg-10">
                                            <div className="projectExperienceWrapper">
                                                <h5>{project.projectName}</h5>
                                                <p>{project.projectDescription}</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="removeFieldButton" onClick={() => openEditModal('projects', index)}>
                                                <img src={penIconLarge} alt="Update Button" />
                                            </button>
                                            <button type="button" className="removeFieldButton" onClick={() => openViewModal('projects', index)}>
                                                <img src={eyeIconLarge} alt="Preview Button" />
                                            </button>
                                            <button type="button" className="removeFieldButton" onClick={() => handleDelete('projects', index)}>
                                                <img src={trashIconLarge} alt="Delete Button" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </form>
                <Modal
                    open={openModal.type !== ''}
                    onClose={() => setOpenModal({ type: '', mode: '', index: null })}
                >
                    {renderModalContent()}
                </Modal>
            </div>
        </>
    );
}