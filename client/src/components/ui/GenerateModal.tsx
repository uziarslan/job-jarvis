import { Dialog, Button, Select, styled, MenuItem, SelectChangeEvent, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import "./GenerateModal.css";
import axiosInstance from "../../services/axiosInstance";
import TemplateView from "./TemplateView";

interface Profile {
    _id: string;
    profileDetails: { profileName: string };
}

interface Template {
    _id: string;
    templateName: string;
    templateDescription: string;
    templateContent?: string;
    profile?: string;
    default?: boolean;
}

interface GenerateModalProps {
    open: boolean;
    onClose: () => void;
    onGenerate: (content: string) => void;
    jobData: any;
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

export default function GenerateModal({ open, onClose, onGenerate, jobData }: GenerateModalProps) {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState("");
    const [templateFilter, setTemplateFilter] = useState<"all" | "jobjarvis" | "my">("all");
    const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
    const [defaultTemplates, setDefaultTemplates] = useState<Template[]>([]);
    const [templateViewOpen, setTemplateViewOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (jobData.type === "coverLetter") {
            setTemplateViewOpen(false);
        } else if (jobData.type === "question") {
            setTemplateViewOpen(true);
        }
    }, [jobData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profilesRes, templatesRes, defaultTemplatesRes] = await Promise.all([
                    axiosInstance.get<{ profiles: Profile[] }>("/api/v1/profiles"),
                    axiosInstance.get<Template[]>("/api/v1/templates"),
                    axiosInstance.get<Template[]>("/api/v1/templates-default"),
                ]);

                setProfiles(profilesRes.data.profiles);
                setCustomTemplates(templatesRes.data);
                setDefaultTemplates(defaultTemplatesRes.data);
                if (profilesRes.data.profiles.length > 0) {
                    setSelectedProfile(profilesRes.data.profiles[0]._id);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteTemplate = async (templateId: string) => {
        if (!window.confirm("Are you sure you want to delete this template?")) return;
        try {
            await axiosInstance.delete(`/api/v1/template/${templateId}`);
            setCustomTemplates(customTemplates.filter((t) => t._id !== templateId));
        } catch (error) {
            console.error("Failed to delete template:", error);
        }
    };

    const filteredTemplates =
        templateFilter === "my"
            ? customTemplates
            : templateFilter === "jobjarvis"
                ? defaultTemplates
                : [...customTemplates, ...defaultTemplates];

    return (
        <DialogWithStyle open={open} onClose={onClose} aria-labelledby="generate-proposal-dialog">
            {templateViewOpen ? (
                <TemplateView
                    open={templateViewOpen}
                    onClose={() => setTemplateViewOpen(false)}
                    closeModal={onClose}
                    template={selectedTemplate!}
                    templateList={filteredTemplates}
                    setSelectedTemplate={setSelectedTemplate}
                    selectedProfile={selectedProfile}
                    setSelectedProfile={setSelectedProfile}
                    profiles={profiles}
                    jobData={jobData}
                    onGenerate={onGenerate}
                />
            ) : (
                <>
                    <div className="row justify-content-between align-items-center">
                        <div className="col">
                            <img
                                className="modalLogo"
                                src={chrome.runtime.getURL("assets/black-test-logo.png")}
                                alt="Job Jarvis Logo"
                            />
                        </div>
                        <div className="col">
                            <div
                                className="crossIconWrapper"
                                onClick={onClose}
                                role="button"
                                aria-label="Close dialog"
                            >
                                <img src={chrome.runtime.getURL("assets/cross-icon.svg")} alt="Close" />
                            </div>
                        </div>
                    </div>
                    <div className="profileAndTemplateContainer">
                        <div className="containerText" id="generate-proposal-dialog">
                            <span>Generate Proposal for</span>
                            <FormControl>
                                <Select
                                    sx={{ height: "40px" }}
                                    value={selectedProfile}
                                    onChange={(e) => setSelectedProfile(e.target.value)}
                                    aria-label="Select profile"
                                >
                                    {profiles.map(({ _id, profileDetails }) => (
                                        <MenuItem key={_id} value={_id}>
                                            {profileDetails.profileName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <span>Using</span>
                            <FormControl>
                                <Select
                                    sx={{ height: "40px" }}
                                    value={templateFilter}
                                    onChange={(e) => setTemplateFilter(e.target.value as "all" | "jobjarvis" | "my")}
                                    aria-label="Select template filter"
                                >
                                    <MenuItem value="all">All Templates</MenuItem>
                                    <MenuItem value="jobjarvis">Job Jarvis Templates</MenuItem>
                                    <MenuItem value="my">My Templates</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="templatesContainer">
                        <div className="addNewtemplate">
                            <h1 className="templateHeading">Add a new template</h1>
                            <p className="templateDescription">
                                Create a new template from the template library or create a new from scratch.
                            </p>
                            <ButtonWithStyleTemplate variant="contained" aria-label="Add new template">
                                + Add New Template
                            </ButtonWithStyleTemplate>
                        </div>
                        {filteredTemplates.map((template) => (
                            <div key={template._id} className="templateCard" role="article">
                                <h1 className="templateHeading">{template.templateName}</h1>
                                <p className="templateDescription">{template.templateDescription}</p>
                                <div className="templateActions">
                                    <ButtonWithStyleTemplate
                                        variant="contained"
                                        aria-label={`Generate proposal using ${template.templateName}`}
                                        disabled={isGenerating}
                                    >
                                        Generate
                                    </ButtonWithStyleTemplate>
                                    <EditButton
                                        onClick={() => {
                                            setTemplateViewOpen(true);
                                            setSelectedTemplate(template);
                                        }}
                                        variant="contained"
                                        aria-label={`Edit ${template.templateName}`}
                                    >
                                        <img src={chrome.runtime.getURL("assets/icon_code.svg")} alt="Edit template" />
                                    </EditButton>
                                    {template.profile && (
                                        <DeleteButton
                                            onClick={() => handleDeleteTemplate(template._id)}
                                            variant="contained"
                                            aria-label={`Delete ${template.templateName}`}
                                        >
                                            <img src={chrome.runtime.getURL("assets/trash-icon.svg")} alt="Delete template" />
                                        </DeleteButton>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </DialogWithStyle>
    );
}