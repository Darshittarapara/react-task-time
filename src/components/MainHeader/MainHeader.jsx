import React from 'react';
import NavBar from './Navbar/Navbar';
import './MainHeader.css';
import { NavLink } from 'react-router-dom';

const MainHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className='containrer-fluid header'>
            <div className='row'>
               
                <div className='col-sm-4 col-lg-4 col-6'>
                    <NavBar />
                </div>
                <div className='col-4'>
                    <h4>Hi ! {user?.displayName}</h4>
                </div>
            </div>
        </div>
    )
};
export default MainHeader;