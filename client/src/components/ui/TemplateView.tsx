import { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, styled, Accordion, AccordionSummary, AccordionDetails, Typography, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RichTextArea from './forms/RichTextArea';
import { EmojiMenuButton } from "./EmojiMenuButton";
import { AISnippetMenuButton } from "./CustomAISnippet";
import { SpecialCharactersMenuButton } from "./CustomSpecialCharacters";
import { CustomAISnippet } from "./CustomAISnippet";
import { CustomSpecialCharacters } from "./CustomSpecialCharacters";
import axiosInstance from '../../services/axiosInstance';
import { htmlToText } from 'html-to-text';
import { Profile, Template, JobData } from '../../types';

interface TemplateViewProps {
    open: boolean;
    onClose: () => void;
    closeModal: () => void;
    template: Template | null;
    templateList: Template[];
    setSelectedTemplate: (template: Template) => void;
    selectedProfile: string;
    setSelectedProfile: (profileId: string) => void;
    profiles: Profile[];
    jobData: JobData;
    onGenerate: (content: string) => void;
}

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 15px;
  box-shadow: 0px 0px 3px 0px #00000040;
  border-radius: 8px;
  & fieldset { border: none; }
`;

const StyledSelect = styled(Select)`
  border-radius: 8px;
`;

const StyledAccordion = styled(Accordion)`
  background: white;
  box-shadow: none;
  & .MuiButtonBase-root { padding: 0px 24px; }
  & .MuiAccordionDetails-root {
    padding: 0px 24px;
    font-size: 14px;
    line-height: 25px;
    color: #475467;
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(135deg, #00AEEF 0%, #16D3F0 91%);
  color: white;
  border-radius: 8px;
  font-size: 14px;
  text-transform: capitalize;
  width: 100%;
  height: 50px;
  &:hover {
    background: linear-gradient(135deg, #00AEEF 0%, #16D3F0 91%);
  }
`;

const OutlineButton = styled(StyledButton)`
  background: white;
  border: 1px solid #1FC0E9;
  color: #1FC0E9;
  &:hover {
    background: #1FC0E9;
    color: white;
  }
`;

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
    const [content, setContent] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setContent(
            template?.templateContent ||
            `<p>{I need a concise response to the following question:<br>${jobData.questionText || ''}<br>Instructions: Answer the question directly. If I do not have the skills, experiences, or qualifications requested, then highlight similar or related skills.}</p>`
        );
        setIsGenerated(false);
    }, [template, jobData]);

    const handleGenerate = async () => {
        setIsLoading(true);
        const endpoint = jobData.type === 'coverLetter' ? '/api/v1/generate-proposal' : '/api/v1/generate-answer';
        try {
            const { status, data } = await axiosInstance.post(endpoint, {
                content,
                profileId: selectedProfile,
                templateId: template?._id,
                jobData,
            });
            if (status === 201) {
                setContent(data);
                setIsGenerated(true);
            }
        } catch (error: any) {
            setContent(error?.response?.data?.error || 'Error generating content');
        }
        setIsLoading(false);
    };

    const handleInsert = async () => {
        const plainText = htmlToText(content, {
            wordwrap: false,
            preserveNewlines: false,
            selectors: [
                { selector: 'p', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
                { selector: 'br', format: 'lineBreak' },
                { selector: 'ul', options: { itemPrefix: '• ' } },
                { selector: 'li', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            ],
        })
            .replace(/\n{2,}/g, '\n\n')
            .trim();

        await axiosInstance.post('/api/v1/history', {
            content: plainText,
            jobData,
        });

        onGenerate(plainText);
        closeModal();
    };

    return (
        <div role="dialog" aria-labelledby="template-view-title">
            <div className="row justify-content-between align-items-center templateViewHeader">
                <h1 id="template-view-title" className="containerText">Generate Proposal</h1>
                <div
                    className="crossIconWrapper"
                    onClick={closeModal}
                    role="button"
                    aria-label="Close template view"
                    tabIndex={0}
                    aria-disabled={isLoading}
                    style={isLoading ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                >
                    <img src={chrome.runtime.getURL('assets/cross-icon.svg')} alt="Close" />
                </div>
            </div>
            <div className="templateViewContentWrapper">
                <div className="templateViewContent">
                    {jobData.type === 'coverLetter' && (
                        <>
                            <StyledFormControl>
                                <InputLabel sx={{ background: '#fff', padding: '0px 5px' }}>Template</InputLabel>
                                <StyledSelect
                                    value={template?._id || ''}
                                    onChange={e => {
                                        const selected = templateList.find(t => t._id === e.target.value);
                                        if (selected) {
                                            setSelectedTemplate(selected);
                                            setContent(selected.templateContent || '');
                                            setIsGenerated(false);
                                        }
                                    }}
                                    aria-label="Select template"
                                >
                                    {templateList.map(t => (
                                        <MenuItem key={t._id} value={t._id}>{t.templateName}</MenuItem>
                                    ))}
                                </StyledSelect>
                            </StyledFormControl>
                            <StyledFormControl>
                                <InputLabel sx={{ background: '#fff', padding: '0px 5px' }}>Profile</InputLabel>
                                <StyledSelect
                                    value={selectedProfile}
                                    onChange={e => setSelectedProfile(e.target.value as string)}
                                    aria-label="Select profile"
                                >
                                    {profiles.map(p => (
                                        <MenuItem key={p._id} value={p._id}>{p.profileDetails.profileName}</MenuItem>
                                    ))}
                                </StyledSelect>
                            </StyledFormControl>
                        </>
                    )}
                    <RichTextArea
                        content={content}
                        setContent={setContent}
                        height={350}
                        extraControls={[EmojiMenuButton, SpecialCharactersMenuButton, AISnippetMenuButton]}
                        extraExtensions={[CustomAISnippet, CustomSpecialCharacters]}
                    />
                    <div className="templateViewFooter">
                        <OutlineButton disabled={isLoading} onClick={jobData.type === 'coverLetter' ? onClose : closeModal}>Cancel</OutlineButton>
                        <StyledButton
                            disabled={isLoading}
                            loadingIndicator={<CircularProgress sx={{ color: "#fff" }} size={20} />}
                            loading={isLoading}
                            onClick={isGenerated ? handleInsert : handleGenerate}>
                            {isGenerated ? 'Insert' : 'Generate'}
                        </StyledButton>
                    </div>
                </div>
                <div className="jobContent">
                    <div className="jobTitleSection">
                        <h2 className="jobTitle">{jobData.jobTitle}</h2>
                        <p className="jobPosted">Posted: {jobData.jobPosted}</p>
                    </div>
                    <StyledAccordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="jobDescription-content" id="jobDescription-header">
                            <Typography sx={{ fontWeight: 600, fontSize: '14px' }}>Job Description</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {jobData.jobDescription}
                            <div className="jobTagsContainer">
                                {jobData.jobSkills?.map((tag: string, index: number) => (
                                    <div key={index} className="jobTag">{tag}</div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </StyledAccordion>
                </div>
            </div>
        </div>
    );
}