import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, styled, Accordion, AccordionSummary, AccordionDetails, Typography, MenuItem, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RichTextArea from "./forms/RichTextArea";
import { EmojiMenuButton } from "./EmojiMenuButton";
import { AISnippetMenuButton } from "./CustomAISnippet";
import { SpecialCharactersMenuButton } from "./CustomSpecialCharacters";
import { CustomAISnippet } from "./CustomAISnippet";
import { CustomSpecialCharacters } from "./CustomSpecialCharacters";

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
    template: any;
    templateList: any[];
    setSelectedTemplate: (template: Template | any) => void;
    selectedProfile: string;
    setSelectedProfile: (profileId: string) => void;
    profiles: Profile[];
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
    template,
    templateList,
    setSelectedTemplate,
    selectedProfile,
    setSelectedProfile,
    profiles,
}: TemplateViewProps) {
    const [content, setContent] = useState(template.templateContent);

    useEffect(() => {
        setContent(template.templateContent);
    }, [template]);

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
                        onClick={onClose}
                        role="button"
                        aria-label="Close template view"
                    >
                        <img src={chrome.runtime.getURL("assets/cross-icon.svg")} alt="Close" />
                    </div>
                </div>
            </div>
            <div className="templateViewContentWrapper">
                <div className="templateViewContent">
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
                    <RichTextArea
                        key={template._id}
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
                        <ButtonWithStyles>
                            Generate
                        </ButtonWithStyles>
                    </div>
                </div>
                <div className="jobContent">
                    <div className="jobTitleSection">
                        <h2 className="jobTitle">Esoteric Consultation Platform Development (Web + Chat + Mobile)</h2>
                        <p className="jobPosted">Posted: May 12, 2025</p>
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
                            Hello, My name is Vladimir. I am looking for a team to develop an online consultation platform in the field of esotericism (tarot, astrology, clairvoyance, etc.). Core components of the project: - Website - Chat system - Mobile application - Partner landing page - Admin panel - Integrations and more Examples of similar platforms: - https://psychicbook.net - https://www.mysticsense.com - https://www.spiritualblossom.com Development approach: - Website and mobile application - Multifunctional chat system Budget: We are targeting a budget range of $10,000–$15,000. If the collaboration proves effective, we are ready to expand the budget in future phases. It is important that this budget covers actual functional implementation, not just design or a prototype. I would appreciate your feedback on the following: - Suggested tech stack - Timeline and budget estimation If you're interested in the project, feel free to message me directly. I'll be happy to answer any questions and provide the technical brief. **Only considering freelancers located in Ukraine, preferably in Kyiv.**
                            <div className="jobTagsContainer">
                                {Array(8).fill("Web Development").map((tag, index) => (
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