import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, styled, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichTextArea from "./forms/RichTextArea";
import { EmojiMenuButton } from "./EmojiMenuButton";
import { AISnippetMenuButton } from "./CustomAISnippet";
import { SpecialCharactersMenuButton } from "./CustomSpecialCharacters";
import { CustomAISnippet } from "./CustomAISnippet";
import { CustomSpecialCharacters } from "./CustomSpecialCharacters";
import axiosInstance from "../../services/axiosInstance";
import { htmlToText } from 'html-to-text';

interface Profile {
    _id: string;
    profileDetails: { profileName: string };
}

interface Template {
    _id: string;
    templateName: string;
    templateContent: string;
}

interface TemplateViewProps {
    open: boolean;
    onClose: () => void;
    closeModal: () => void;
    template: any;
    templateList: any[];
    setSelectedTemplate: (template: Template | any) => void;
    selectedProfile: string;
    setSelectedProfile: (profileId: string) => void;
    profiles: Profile[];
    jobData: any;
    onGenerate: (content: string) => void;
}

const StyledFormControl = styled(FormControl)({
    width: "100%",
    border: "none",
    marginBottom: "15px",
    boxShadow: "0px 0px 3px 0px #00000040",
    borderRadius: "8px",

});

const StyledSelect = styled(Select)({
    border: "none !important",
    borderRadius: "8px",
    boxShadow: "none",
    outline: "none",
    "& fieldset": {
        border: "none",
    },
});

const StyledAccordion = styled(Accordion)({
    background: "white",
    boxShadow: "none",
    "& .MuiButtonBase-root": {
        padding: "0px 24px",
    },
    "& .MuiAccordionDetails-root": {
        padding: "0px 24px",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "25px",
        letterSpacing: "0%",
        color: "#475467",
    },
});

const TypographyWithStyles = styled(Typography)({
    fontWeight: 600,
    fontSize: "14px",
});

const ButtonWithStylesOutline = styled(Button)({
    background: "white",
    border: "1px solid #1FC0E9",
    color: "#1FC0E9",
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "14px",
    padding: "0px",
    textTransform: "capitalize",
    width: "100%",
    height: "50px",
    "&:hover": {
        background: "#1FC0E9",
        color: "white",
    },
});

const ButtonWithStyles = styled(Button)({
    border: "none",
    background: "linear-gradient(135deg, #00AEEF 0%, #16D3F0 91%)",
    color: "white",
    borderRadius: "8px",
    fontWeight: 500,
    fontSize: "14px",
    padding: "0px",
    textTransform: "capitalize",
    width: "100%",
    height: "50px",
    "&:hover": {
        background: "linear-gradient(135deg, #00AEEF 0%, #16D3F0 91%)"
    },
});

export default function TemplateView({
    onClose,
    closeModal,
    template,
    templateList,
    setSelectedTemplate,
    selectedProfile,
    setSelectedProfile,
    profiles,
    jobData,
    onGenerate,
}: TemplateViewProps) {
    const [content, setContent] = useState(template?.templateContent || `<p>{I need a concise response to the following question:<br>${jobData?.questionText}<br>Instructions: Answer the question directly. If I do not have the skills, experiences, or qualifications requested, then highlight similar or related skills.}`)
    const [coverLetterGenerated, setCoverLetterGenerated] = useState(false);

    useEffect(() => {
        setContent(template?.templateContent || `<p>{I need a concise response to the following question:<br>${jobData?.questionText}<br>Instructions: Answer the question directly. If I do not have the skills, experiences, or qualifications requested, then highlight similar or related skills.}`);
    }, [template]);

    const handleGenerate = async () => {
        switch (jobData.type) {
            case "coverLetter":
                try {
                    const { status, data } = await axiosInstance.post("/api/v1/generate-proposal", { content, profileId: selectedProfile, templateId: template._id, jobData });

                    if (status === 201) {
                        setContent(data);
                        setCoverLetterGenerated(true);
                    }

                } catch (error) {
                    console.error(error);
                    setCoverLetterGenerated(false);
                }
                break;
            case "question":
                try {
                    const { status, data } = await axiosInstance.post("/api/v1/generate-answer", { content, profileId: selectedProfile, jobData });

                    if (status === 201) {
                        setContent(data);
                        setCoverLetterGenerated(true);
                    }
                } catch (error) {
                    console.error(error);
                    setCoverLetterGenerated(false);
                }
                break;
        }
    }

    return (
        <div role="dialog" aria-labelledby="template-view-title">
            <div className="row justify-content-between align-items-center templateViewHeader">
                <div className="col">
                    <h1 id="template-view-title" className="containerText">
                        Generate Proposal
                    </h1>
                </div>
                <div className="col">
                    <div
                        className="crossIconWrapper"
                        onClick={closeModal}
                        role="button"
                        aria-label="Close template view"
                    >
                        <img src={chrome.runtime.getURL("assets/cross-icon.svg")} alt="Close" />
                    </div>
                </div>
            </div>
            <div className="templateViewContentWrapper">
                <div className="templateViewContent">
                    {
                        jobData.type === "coverLetter" ? (
                            <>
                                <StyledFormControl>
                                    <InputLabel sx={{ background: "#fff", padding: "0px 5px" }} id="templateSelect">
                                        Template
                                    </InputLabel>
                                    <StyledSelect
                                        labelId="templateSelect"
                                        id="templateSelect"
                                        value={template._id}
                                        label="Template"
                                        onChange={(e) => {
                                            const selected = templateList.find((item) => item._id === e.target.value);
                                            if (selected) {
                                                setSelectedTemplate(selected);
                                                setContent(selected.templateContent);
                                            }
                                        }}
                                        aria-label="Select template"
                                    >
                                        {templateList.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.templateName}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </StyledFormControl>
                                <StyledFormControl>
                                    <InputLabel sx={{ background: "#fff", padding: "0px 5px" }} id="profileSelect">
                                        Profile
                                    </InputLabel>
                                    <StyledSelect
                                        labelId="profileSelect"
                                        id="profileSelect"
                                        value={selectedProfile}
                                        label="Profile"
                                        onChange={(e) => setSelectedProfile(e.target.value as string)}
                                        aria-label="Select profile"
                                    >
                                        {profiles.map((item) => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.profileDetails.profileName}
                                            </MenuItem>
                                        ))}
                                    </StyledSelect>
                                </StyledFormControl>
                            </>
                        ) : ''
                    }
                    <RichTextArea
                        content={content}
                        setContent={setContent}
                        height={350}
                        extraControls={[EmojiMenuButton, SpecialCharactersMenuButton, AISnippetMenuButton]}
                        extraExtensions={[CustomAISnippet, CustomSpecialCharacters]}
                    />
                    <div className="templateViewFooter">
                        <ButtonWithStylesOutline onClick={onClose}>
                            Cancel
                        </ButtonWithStylesOutline>
                        {
                            !coverLetterGenerated ? (
                                <ButtonWithStyles onClick={handleGenerate}>
                                    Generate
                                </ButtonWithStyles>
                            ) : (
                                <ButtonWithStyles onClick={() => {
                                    onGenerate(htmlToText(content, {
                                        wordwrap: false
                                    }))
                                    closeModal()
                                }}>
                                    Insert
                                </ButtonWithStyles>
                            )
                        }
                    </div>
                </div>
                <div className="jobContent">
                    <div className="jobTitleSection">
                        <h2 className="jobTitle">{jobData.jobTitle}</h2>
                        <p className="jobPosted">Posted: {jobData.jobPosted}</p>
                    </div>
                    <StyledAccordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="jobDescription-content"
                            id="jobDescription-header"
                        >
                            <TypographyWithStyles>Job Description</TypographyWithStyles>
                        </AccordionSummary>
                        <AccordionDetails>
                            {jobData.jobDescription}
                            <div className="jobTagsContainer">
                                {jobData.jobSkills.map((tag: string, index: number) => (
                                    <div key={index} className="jobTag">
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </StyledAccordion>
                </div>
            </div>
        </div>
    );
}