import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import authImg from "../Assets/images/auth.png"
import logo from "../Assets/images/logoblack.png";
import { TextField, styled, FormControl, InputLabel, OutlinedInput, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const TextFieldWithStyles = styled(TextField)({
    '& .MuiInputBase-root': {
        borderRadius: '8px',
        border: '1px solid #DCDCDC',
    },
    '& .MuiInputBase-input': {
        fontSize: '14px',
        color: '#000',
    },
    '& .MuiInputBase-input::placeholder': {
        fontSize: '14px',
        color: '#898989',
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#00AEEF',
            borderWidth: '2px'
        }
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#00AEEF'
    }
});

const OutlinedInputWithStyles = styled(OutlinedInput)({
    '&.MuiOutlinedInput-root': {
        borderRadius: '8px',
        border: '1px solid #DCDCDC',
    },
    '& .MuiInputBase-input': {
        fontSize: '14px',
        color: '#000',
    },
    '& .MuiInputBase-input::placeholder': {
        fontSize: '14px',
        color: '#898989',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#00AEEF',
        borderWidth: '2px',
    },
    '&.Mui-focused': {
        color: '#00AEEF',
    },
});

const InputLabelWithStyles = styled(InputLabel)({
    '&.Mui-focused': {
        color: '#00AEEF'
    }
});

const ButtonWithStyles = styled(Button)({
    background: 'linear-gradient(90deg, #00AEEF 0%, #16D3F0 100%)',
    color: '#fff',
    borderRadius: '8px',
    height: "48px",
    fontSize: '14px',
    textTransform: 'capitalize',
    fontWeight: '600',
    width: '100%',
});

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const { register, googleLogin } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            setFormData({
                username: "",
                password: ""
            });
            window.location.href = "https://www.upwork.com/ab/account-security/login?redir=%2Fnx%2Ffind-work%2F"
        } catch (error) {
            console.error("Signup failed", error.response ? error.response.data.error : error.message);
        }
    }

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        try {
            await googleLogin(credentialResponse);
            window.location.href = "https://www.upwork.com/ab/account-security/login?redir=%2Fnx%2Ffind-work%2F"
        } catch (error) {
            console.error("Google login failed:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container max-width">
            <div className="row align-items-center vh-100">
                <div className="col-md-6">
                    <img className="auth-img" src={authImg} alt="auth" />
                    <div className="auth-content">
                        <h2>Tired of spending time and Connects on Cover Letter proposals that never get viewed?</h2>
                        <p>Then you need to try Job Jarvis - a new AI tool that generates highly personalized cover letter proposals in seconds. Stop wasting time and start closing more clients with Job Jarvis.</p>
                    </div>
                </div>
                <div className="col-md-6 auth-form">
                    <img className="authLogo" src={logo} alt="logo" />
                    <form onSubmit={handleSubmit} className="auth-form-container">
                        <h1 className="auth-form-heading">Sign up</h1>
                        <div className="mb-4">
                            <TextFieldWithStyles label="Email address" value={formData.username} name="username" onChange={handleChange} type="text" className="w-100" id="username" />
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <TextFieldWithStyles label="First Name" value={formData.firstName} name="firstName" onChange={handleChange} type="text" className="w-100" id="firstName" />
                            </div>
                            <div className="col">
                                <TextFieldWithStyles label="Last Name" value={formData.lastName} name="lastName" onChange={handleChange} type="text" className="w-100" id="lastName" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabelWithStyles htmlFor="password">Password</InputLabelWithStyles>
                                <OutlinedInputWithStyles
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={showPassword ? 'hide the password' : 'display the password'}
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <ButtonWithStyles type="submit">Sign Up</ButtonWithStyles>
                        <div className="seprator">
                            or
                        </div>
                        <GoogleOAuthProvider clientId={clientId}>
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => console.error("Login Failed")}
                            />
                        </GoogleOAuthProvider>
                    </form>
                </div>
            </div>
            <p className="toggleUrl">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
    );
}