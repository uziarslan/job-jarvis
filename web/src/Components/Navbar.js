import React from "react";
import logo from "../Assets/images/logo.png";

export default function Navbar() {
    return (
        <>
            <nav class="navbar navbar-expand-md bg-body-tertiary">
                <div class="container-fluid max-width">
                    <a class="navbar-brand" href="/">
                        <img src={logo} alt="Job Jarvis Logo" width="30" height="24" class="d-inline-block align-text-top me-2" />
                        Job Jarvis
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <div className="profile">
                                    <img src="https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg" alt="Profile" className="profile-image" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}