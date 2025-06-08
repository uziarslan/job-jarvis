import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GenerateModal from '../components/ui/GenerateModal';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#00AEEF' },
    secondary: { main: '#637381' },
  },
});

export function createModalRoot() {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'job-jarvis-modal-root';
  document.body.appendChild(modalRoot);
  return modalRoot;
}

let currentRoot: ReturnType<typeof createRoot> | null = null;

export function renderModal(modalRoot: HTMLElement, { open, onClose, onGenerate, title, jobData }: {
  open: boolean;
  onClose: () => void;
  onGenerate: (content: string) => void;
  title: string;
  jobData: any;
}) {
  if (currentRoot) currentRoot.unmount();
  currentRoot = createRoot(modalRoot);

  currentRoot.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GenerateModal
        open={open}
        onClose={() => { currentRoot?.unmount(); currentRoot = null; onClose(); }}
        onGenerate={onGenerate}
        jobData={jobData}
      />
    </ThemeProvider>
  );

  return currentRoot;
}