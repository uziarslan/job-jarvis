import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { Button, styled, Skeleton } from '@mui/material'
import { Switch } from '@mui/material'
import checkIcon from '../Assets/images/check-blue.svg'
import chrome from '../Assets/images/chrome-white-icon.svg';

const Android12Switch = styled(Switch)(({ theme }) => ({
    width: 77,
    height: 32,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    '& .MuiSwitch-switchBase': {
        padding: 6,
        '&.Mui-checked': {
            transform: 'translateX(45px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                background: 'linear-gradient(135deg, #00AEEF 0%, #16D3F0 91%)',
                opacity: 1,
            },
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 20,
        height: 20,
        margin: 0,
        backgroundColor: '#fff',
    },
    '& .MuiSwitch-track': {
        borderRadius: 40,
        background: 'linear-gradient(135deg, #00AEEF 0%, #16D3F0 91%)',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

const ActionButton = styled(Button)(({ theme }) => ({
    background: "linear-gradient(180deg, #16D3F0 0%, #00AEEF 100%)",
    color: "#F8F8F8",
    borderRadius: 40,
    padding: "8px 19px",
    fontWeight: 600,
    fontSize: 14,
    boxShadow: "none",
    textTransform: "capitalize",
    fontFamily: "Poppins",
    "& img": {
        width: 20,
        height: 20,
    }
}));

const packages = [
    {
        packageName: 'Free',
        price: {
            monthly: '$14.99',
            annually: '$9.99'
        },
        features: [
            '1 Freelancer Profile',
            "50 Proposals / Month",
            "Email support",
            "Online Community Access"
        ]
    },
    {
        packageName: 'Freelancer',
        price: {
            monthly: '$14.99',
            annually: '$9.99'
        },
        features: [
            '1 Freelancer Profile',
            "50 Proposals / Month",
            "Email support",
            "Online Community Access"
        ]
    },
    {
        packageName: 'Coming Soon',
        price: {
            monthly: '$14.99',
            annually: '$9.99'
        },
        features: [
            '1 Freelancer Profile',
            "50 Proposals / Month",
            "Email support",
            "Online Community Access"
        ]
    }
]

export default function Pricing() {
    const [billType, setBillType] = useState('annually'); // 'annually' or 'monthly'
    const [loading, setLoading] = useState(false);

    const handleSwitch = () => {
        setLoading(true);
        setBillType((prev) => prev === 'annually' ? 'monthly' : 'annually');
        setTimeout(() => setLoading(false), 500);
    };

    return (
        <div className='position-relative top-layer'>
            <Navbar />
            <div className="heroSectionEllipses" />
            <div className="heroSectionEllipsesBottomRight" />
            <div className="content-pricing">
                <div className="pricing-heading">
                    <h1 className='pricing-heading-title'>Free 14-day Trial No-Risk Guarantee</h1>
                </div>
                <div className="row justify-content-center align-items-center mb-4">
                    <div className="col">
                        <h2 className={`plan-type ${billType === 'monthly' ? "text-dark" : ""}`}>Bill Monthly</h2>
                    </div>
                    <div className="col">
                        <Android12Switch checked={billType === 'annually'} onChange={handleSwitch} />
                    </div>
                    <div className="col">
                        <h2 className={`plan-type ${billType === 'annually' ? "text-dark" : ""}`}>Bill Annually</h2>
                    </div>
                </div>
                <div className="row">
                    {
                        packages?.map((p, index) => (
                            <div key={index} className={`col ${index === 2 ? "blur-card" : ""}`}>
                                <div className="pricing-card">
                                    <div className="pricing-card-header">
                                        <h2 className='pricing-card-title'>{p.packageName}</h2>
                                    </div>
                                    <div className="pricing-card-price-container">
                                        {loading ? (
                                            <Skeleton variant="text" width={150} height={83} animation="wave" />
                                        ) : (
                                            <h3 className='pricing-card-price'>{billType === 'annually' ? p.price.annually : p.price.monthly}<span className='pricing-card-price-duration'>/Per month</span></h3>
                                        )}
                                    </div>
                                    <div className="pricing-card-body">
                                        <ul className='pricing-card-list'>
                                            {p.features.map((feature) => (
                                                <li className='pricing-card-list-item'>
                                                    <span className='pricing-card-list-item-icon'>
                                                        <img src={checkIcon} alt="check" />
                                                    </span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pricing-card-footer">
                                            <ActionButton fullWidth startIcon={<img src={chrome} alt="chrome" />} variant="contained"
                                            >Get Started</ActionButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}