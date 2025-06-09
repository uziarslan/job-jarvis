import { useState, useEffect } from 'react';
import { Dialog, Button, Select, MenuItem, FormControl, styled } from '@mui/material';
import axiosInstance from '../../services/axiosInstance';
import TemplateView from './TemplateView';
import { Profile, Template, JobData } from '../../types';
import './GenerateModal.css';

interface GenerateModalProps {
    open: boolean;
    onClose: () => void;
    onGenerate: (content: string) => void;
    jobData: JobData;
}

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    height: 100%;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 30px;
    padding: 20px 50px;
  }
`;

const StyledButton = styled(Button)`
  text-transform: capitalize;
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(180deg, #16D3F0 0%, #00AEEF 100%);
  color: #fff;
  font-weight: 700;
  font-size: 14px;
`;

const ActionButton = styled(Button) <{ bgColor?: string }>`
  text-transform: capitalize;
  width: 58px;
  height: 40px;
  border-radius: 8px;
  background: ${({ color }) => color || 'transparent'};
  box-shadow: 0px 0px 3px 0px #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function GenerateModal({ open, onClose, onGenerate, jobData }: GenerateModalProps) {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState('');
    const [templateFilter, setTemplateFilter] = useState<'all' | 'jobjarvis' | 'my'>('all');
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [showTemplateView, setShowTemplateView] = useState(jobData.type === 'question');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profilesRes, customTemplatesRes, defaultTemplatesRes] = await Promise.all([
                    axiosInstance.get<{ profiles: Profile[] }>('/api/v1/profiles'),
                    axiosInstance.get<Template[]>('/api/v1/templates'),
                    axiosInstance.get<Template[]>('/api/v1/templates-default'),
                ]);
                setProfiles(profilesRes.data.profiles);
                setTemplates([...customTemplatesRes.data, ...defaultTemplatesRes.data]);
                setSelectedProfile(profilesRes.data.profiles[0]?._id || '');
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteTemplate = async (templateId: string) => {
        if (!window.confirm('Are you sure you want to delete this template?')) return;
        try {
            await axiosInstance.delete(`/api/v1/template/${templateId}`);
            setTemplates(templates.filter(template => template._id !== templateId));
        } catch (error) {
            console.error('Failed to delete template:', error);
        }
    };

    const filteredTemplates = templateFilter === 'my'
        ? templates.filter(t => t.profile)
        : templateFilter === 'jobjarvis'
            ? templates.filter(t => !t.profile)
            : templates;

    return (
        <StyledDialog open={open} onClose={onClose} aria-labelledby="generate-proposal-dialog">
            {showTemplateView ? (
                <TemplateView
                    open={showTemplateView}
                    onClose={() => setShowTemplateView(false)}
                    closeModal={onClose}
                    template={selectedTemplate}
                    templateList={filteredTemplates}
                    setSelectedTemplate={setSelectedTemplate}
                    selectedProfile={selectedProfile}
                    setSelectedProfile={setSelectedProfile}
                    profiles={profiles}
                    jobData={jobData}
                    onGenerate={onGenerate}
                />
            ) : (
                <div className="generate-modal-content">
                    <div className="row justify-content-between align-items-center">
                        <img
                            className="modalLogo"
                            src={chrome.runtime.getURL('assets/black-test-logo.png')}
                            alt="Job Jarvis Logo"
                        />
                        <div
                            className="crossIconWrapper"
                            onClick={onClose}
                            role="button"
                            aria-label="Close dialog"
                        >
                            <img src={chrome.runtime.getURL('assets/cross-icon.svg')} alt="Close" />
                        </div>
                    </div>
                    <div className="profileAndTemplateContainer">
                        <div className="containerText" id="generate-proposal-dialog">
                            <span>Generate Proposal for</span>
                            <FormControl>
                                <Select
                                    sx={{ height: '40px' }}
                                    value={selectedProfile}
                                    onChange={e => setSelectedProfile(e.target.value)}
                                    aria-label="Select profile"
                                >
                                    {profiles.map(profile => (
                                        <MenuItem key={profile._id} value={profile._id}>
                                            {profile.profileDetails.profileName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <span>Using</span>
                            <FormControl>
                                <Select
                                    sx={{ height: '40px' }}
                                    value={templateFilter}
                                    onChange={e => setTemplateFilter(e.target.value as 'all' | 'jobjarvis' | 'my')}
                                    aria-label="Select template filter"
                                >
                                    <MenuItem value="all">All Templates</MenuItem>
                                    <MenuItem value="jobjarvis">Job Jarvis Templates</MenuItem>
                                    <MenuItem value="my">My Templates</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="templatesContainerWrapper">
                        <div className="templatesContainer">
                            <div className="addNewtemplate">
                                <h1 className="templateHeading">Add a new template</h1>
                                <p className="templateDescription">
                                    Create a new template from the template library or create a new from scratch.
                                </p>
                                <StyledButton variant="contained" aria-label="Add new template">
                                    + Add New Template
                                </StyledButton>
                            </div>
                            {filteredTemplates.map(template => (
                                <div key={template._id} className="templateCard" role="article">
                                    <h1 className="templateHeading">{template.templateName}</h1>
                                    <p className="templateDescription">{template.templateDescription}</p>
                                    <div className="templateActions">
                                        <StyledButton
                                            variant="contained"
                                            aria-label={`Generate proposal using ${template.templateName}`}
                                            onClick={() => {
                                                setSelectedTemplate(template);
                                                setShowTemplateView(true);
                                            }}
                                        >
                                            Generate
                                        </StyledButton>
                                        <ActionButton
                                            variant="contained"
                                            aria-label={`Edit ${template.templateName}`}
                                            onClick={() => {
                                                setSelectedTemplate(template);
                                                setShowTemplateView(true);
                                            }}
                                        >
                                            <img src={chrome.runtime.getURL('assets/icon_code.svg')} alt="Edit template" />
                                        </ActionButton>
                                        {template.profile && (
                                            <ActionButton
                                                bgColor="#D11A2A"
                                                variant="contained"
                                                aria-label={`Delete ${template.templateName}`}
                                                onClick={() => handleDeleteTemplate(template._id)}
                                            >
                                                <img src={chrome.runtime.getURL('assets/trash-icon.svg')} alt="Delete template" />
                                            </ActionButton>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </StyledDialog>
    );
}