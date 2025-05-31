import { Box, Button, Dialog, DialogActions, DialogContent, Select, styled, MenuItem, SelectChangeEvent, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import "./GenerateModal.css";
import axiosInstance from "../../services/axiosInstance";

interface IProps {
    open: boolean;
    onClose: () => void;
    onGenerate: () => void;
    title: string;
}

const DialogWithStyle = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    height: 100%;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 30px;
    padding: 20px 50px;
  }
`;

const ButtonWithStyle = styled(Button)`
  text-transform: capitalize;
`;

const ButtonWithStyleTemplate = styled(Button)`
  text-transform: capitalize;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(180deg, #16D3F0 0%, #00AEEF 100%);
  color: #fff;
    font-weight: 700;
    font-size: 14px;
`;

const EditButton = styled(Button)`
  text-transform: capitalize;
  width: 58px;
  height: 40px;
  border-radius: 8px;
  background: transparent;
  box-shadow: 0px 0px 3px 0px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteButton = styled(Button)`
  text-transform: capitalize;
  width: 58px;
  height: 40px;
  border-radius: 8px;
  background: #D11A2A;
  box-shadow: 0px 0px 3px 0px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GenerateModal({ open, onClose, onGenerate, title }: IProps) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [profiles, setProfiles] = useState<Array<{ profileDetails: { profileName: string } }>>([]);
    const [selectedProfile, setSelectedProfile] = useState<string>('');
    const [templates, setTemplates] = useState<string>('all');
    const [templatesList, setTemplatesList] = useState<Array<{}>>([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const { status, data } = await axiosInstance.get('/api/v1/profiles');
                if (status === 200) {
                    setProfiles(data.profiles);
                    if (data.profiles.length > 0) {
                        setSelectedProfile(data.profiles[0].profileDetails.profileName);
                    }
                }
            } catch (error) {
                setProfiles([]);
            }
        }

        const fetchTemplates = async () => {
            try {
                const { status, data } = await axiosInstance.get('/api/v1/templates');
                if (status === 200) {
                    setTemplatesList(data);
                }
            } catch (error) {
                setTemplatesList([]);
            }
        }

        fetchProfiles();
        fetchTemplates();
    }, []);

    const handleProfileChange = (event: SelectChangeEvent) => {
        setSelectedProfile(event.target.value);
    };

    const handleTemplateChange = (event: SelectChangeEvent) => {
        setTemplates(event.target.value);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            await onGenerate();
        } finally {
            setIsGenerating(false);
            onClose();
        }
    };

    return (
        <DialogWithStyle open={open} onClose={onClose}>
            <div className="row justify-content-between align-items-center">
                <div className="col">
                    <img
                        className="modalLogo"
                        src={chrome.runtime.getURL('assets/black-test-logo.png')}
                        alt="logo"
                    />
                </div>
                <div className="col">
                    <div className="crossIconWrapper" onClick={onClose}>
                        <img src={chrome.runtime.getURL('assets/cross-icon.svg')} alt="cross" />
                    </div>
                </div>
            </div>
            <div className="profileAndTemplateContainer">
                <div className="containerText">
                    <span>Generate Proposal for</span>
                    <span>
                        <FormControl>
                            <Select
                                sx={{ height: '40px' }}
                                labelId="profile-select-label"
                                id="profile-select"
                                value={selectedProfile}
                                onChange={handleProfileChange}
                            >
                                {profiles?.map(({ profileDetails }) => (
                                    <MenuItem key={profileDetails.profileName} value={profileDetails.profileName}>{profileDetails.profileName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </span>
                    <span>Using</span>
                    <span>
                        <FormControl>
                            <Select
                                sx={{ height: '40px' }}
                                id="templates"
                                value={templates}
                                onChange={handleTemplateChange}
                            >
                                <MenuItem value="all">All Templates</MenuItem>
                                <MenuItem value="jobjarvis">Job Jarvis Templates</MenuItem>
                                <MenuItem value="my">My Templates</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div>
            </div>
            <div className="templatesContainer">
                <div className="addNewtemplate">
                    <h1 className="templateHeading">Add a new template</h1>
                    <p className="templateDescription">Create a new template from the template library or create a new from scratch.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                {templatesList?.map((template: any) => (
                    <div className="templateCard">
                    <h1 className="templateHeading">{template.templateName}</h1>
                    <p className="templateDescription">{template.templateDescription}</p>
                    <div className="templateActions">
                        <ButtonWithStyleTemplate variant="contained">Generate</ButtonWithStyleTemplate>
                        <EditButton variant="contained">
                            <img src={chrome.runtime.getURL('assets/icon_code.svg')} alt="code" />
                        </EditButton>
                        <DeleteButton variant="contained">
                            <img src={chrome.runtime.getURL('assets/trash-icon.svg')} alt="trash" />
                        </DeleteButton>
                    </div>
                </div>
                ))}
                <div className="templateCard">
                    <h1 className="templateHeading">📝 Standard Cover Letter</h1>
                    <p className="templateDescription">A general purpose template that showcases your relevant skills and experiences.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">💪 My Approach</h1>
                    <p className="templateDescription">Demonstrate that you understand the clients need by discussing your approach.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">🤷‍♂️ Ask questions about a project</h1>
                    <p className="templateDescription">Use this template to respond to detaied job postings and/or complex projects.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">🛠️ My skills for your job</h1>
                    <p className="templateDescription">Let the client know how your skills align with their project.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">📧 Reply to Job Invite</h1>
                    <p className="templateDescription">Got an invite for a job? Then use this template to reply.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">💼 Apply for part-time/full-time job</h1>
                    <p className="templateDescription">Looking to apply to a part-time/full-time job post? Then this template will help you stand out.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">✍️ Short Reply</h1>
                    <p className="templateDescription">An easy way to create a short proposal. Perfect for small jobs.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">💵 Estimate For Project</h1>
                    <p className="templateDescription">Send clients a detailed estimate for their job. Feel free to alter the AI-prompt to include your hourly rate.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">👉 Be Direct</h1>
                    <p className="templateDescription">A direct response to any questions or requirements a client may ask.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
                <div className="templateCard">
                    <h1 className="templateHeading">🚧 Prompt Playground</h1>
                    <p className="templateDescription">Want to experiment with your own AI prompts? Then use this template to write your own.</p>
                    <ButtonWithStyleTemplate variant="contained">+ Add New Template</ButtonWithStyleTemplate>
                </div>
            </div>
        </DialogWithStyle>
    );
} 