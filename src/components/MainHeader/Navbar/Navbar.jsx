import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = (props) => {
    const logOutHandler = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <ul>
            <li>
                <NavLink to="/" className="nav-link">DashBoard</NavLink>
            </li>
            <li>
                <NavLink to="/timehistory" className="nav-link">Time History</NavLink>
            </li>
            <li onClick={() => logOutHandler()}>
                Log out
            </li>
        </ul>
    )
};
export default NavBar;