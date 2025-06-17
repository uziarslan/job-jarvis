import React, { useContext } from 'react';
import logo from '../Assets/images/logo.png';
import { Link } from 'react-router-dom';
import userImg from '../Assets/images/people.png';
import { AuthContext } from '../Context/AuthContext';

export default function DashNav() {
    const { logout, user } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-transparent">
            <div className="container-fluid max-width">
                <Link className="navbar-brand d-flex align-items-center" to="/profiles">
                    <img src={logo} alt="Logo" width="30" className="d-inline-block align-text-top me-2" />
                    Job Jarvis
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item dropdown">
                            <button
                                className="bg-transparent border-0 nav-link p-0"
                                id="userDropdown"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ boxShadow: "none" }}
                            >
                                <img src={user?.profile?.path || userImg} alt="User" width="30" className="d-inline-block align-text-top me-2 user-img" />
                            </button>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="userDropdown"
                            >
                                <li className="dropdown-item disabled">{user?.username}</li>
                                <li><hr class="dropdown-divider" /></li>
                                <li className="dropdown-item text-danger" style={{ cursor: "pointer" }} onClick={logout}>Logout</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div >
        </nav >
    );
}