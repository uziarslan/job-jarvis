import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { register, googleLogin } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

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
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <form onSubmit={handleSubmit} className="w-30 d-flex flex-column">
                <h1>Signup Page</h1>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email</label>
                    <input value={formData.username} name="username" onChange={handleChange} type="text" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={formData.password} onChange={handleChange} name="password" type="password" className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={() => console.error("Login Failed")}
                />
            </GoogleOAuthProvider>
        </div>
    );
}