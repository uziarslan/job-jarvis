import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    marginBottom: '12px',
    border: '1px solid #DBD9D9',
    borderRadius: '12px !important',
    boxShadow: 'none',
    minHeight: '72px',
    transition: 'transform 1s cubic-bezier(0.4,0,0.2,1)',
    '&:hover': {
        transform: 'scale(1.05)',
        zIndex: 1,
    },
    '&:before': {
        display: 'none',
    },
}));

const StyledTypography = styled(Typography)({
    color: '#000',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '3%',
    textTransform: 'capitalize',

});

const StyledTypographySummary = styled(Typography)({
    fontWeight: '300',
    fontSize: '16px',
    lineHeight: '25px',
    letterSpacing: '3%',
    textTransform: 'capitalize',
});

const StyledAccordionSummary = styled(AccordionSummary)({
    minHeight: '72px !important',
    height: '72px',
    display: 'flex',
    alignItems: 'center',
    '&.Mui-expanded': {
        minHeight: '72px',
    },
    '& .MuiAccordionSummary-content': {
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        height: '72px',
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
        alignItems: 'center',
        display: 'flex',
    },
});

export default function Faq() {
    const [hovered, setHovered] = useState(null);
    const faqData = [
        {
            question: "Do I need to upload or share my Upwork credentials?",
            answer: 'No, you do not need to upload or share your Upwork credentials. We will use your Upwork profile to generate a proposal for you.'
        },
        {
            question: "How does Job Jarvis work?",
            answer: 'Job Jarvis is a platform that helps you find the perfect job for you.'
        },
        {
            question: "How does Job Jarvis work?",
            answer: 'Job Jarvis is a platform that helps you find the perfect job for you.'
        },
        {
            question: "How does Job Jarvis work?",
            answer: 'Job Jarvis is a platform that helps you find the perfect job for you.'
        },
        {
            question: "How does Job Jarvis work?",
            answer: 'Job Jarvis is a platform that helps you find the perfect job for you.'
        },
        {
            question: "How does Job Jarvis work?",
            answer: 'Job Jarvis is a platform that helps you find the perfect job for you.'
        },
    ]

    return (
        <div className='max-width'>
            <div className='faq-container'>
                <h5>FAQ's</h5>
                <h2>Frequently Asked Questions</h2>
            </div>
            <div className="row max-width-852">
                <div className="col-12">
                    {faqData.map((item, index) => (
                        <StyledAccordion
                            key={index}
                            expanded={hovered === index}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <StyledAccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}-content`}
                                id={`panel${index}-header`}
                            >
                                <StyledTypography component="span">{item.question}</StyledTypography>
                            </StyledAccordionSummary>
                            <AccordionDetails>
                                <StyledTypographySummary>
                                    {item.answer}
                                </StyledTypographySummary>
                            </AccordionDetails>
                        </StyledAccordion>
                    ))}
                </div>
            </div>
        </div>
    );
}