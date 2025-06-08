import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GenerateModal from '../components/ui/GenerateModal';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00AEEF',
    },
    secondary: {
      main: '#637381',
    },
  },
});

export function createModalRoot() {
  // Remove existing modal root if it exists
  const existingRoot = document.getElementById('job-jarvis-modal-root');
  if (existingRoot) {
    existingRoot.remove();
  }

  const modalRoot = document.createElement('div');
  modalRoot.id = 'job-jarvis-modal-root';
  document.body.appendChild(modalRoot);
  return modalRoot;
}

let currentRoot: ReturnType<typeof createRoot> | null = null;

export function renderModal(modalRoot: HTMLElement, props: {
  open: boolean;
  onClose: () => void;
  onGenerate: (content: string) => void;
  title: string;
  jobData: any;
}) {
  // Clean up previous root if it exists
  if (currentRoot) {
    currentRoot.unmount();
  }

  // Create new root
  currentRoot = createRoot(modalRoot);

  // Wrap onClose to handle cleanup
  const wrappedOnClose = () => {
    if (currentRoot) {
      currentRoot.unmount();
      currentRoot = null;
    }
    props.onClose();
  };

  // Wrap the modal with ThemeProvider and CssBaseline
  currentRoot.render(
    React.createElement(
      ThemeProvider,
      { theme },
      React.createElement(CssBaseline),
      React.createElement(GenerateModal, {
        open: props.open,
        onClose: wrappedOnClose,
        onGenerate: props.onGenerate,
        jobData: props.jobData,
      })
    )
  );

  return currentRoot;
} 