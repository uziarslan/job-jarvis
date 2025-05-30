import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const LoginPage: React.FC = () => {
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

  return (
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <div className='authPageTextWrapper'>
        <h1>Get Started With Job Jarvis</h1>
        <p className='text-muted'>Ready to start generating proposals? Then login below.</p>
      </div>
      <div className='row'>
        <div className='col-6'>
          <div className='customTag text-muted'>
            Existing User?
          </div>
        <Button variant='contained' color='primary' target='_blank' href={`${frontendUrl}/login`}>Login</Button>
        </div>
        <div className='col-6'>
          <div className='customTag text-muted'>
            New User?
          </div>
          <Button variant='outlined' color='primary' target='_blank' href={`${frontendUrl}/signup`}>Signup</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 