import React, { useState } from 'react';
import {
    FaUtensils,
    FaHome,
    FaSignInAlt,
    FaUserPlus,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 shadow-md px-4 py-3 w-full">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer text-white">
                    <FaUtensils className="text-orange-400 text-2xl" />
                    <span className="text-2xl font-extrabold">Go<span className='text-orange-400'>Food</span></span>
                </div>

                {/* Desktop Menu (Search bar removed) */}
                <div className="hidden md:flex items-center space-x-4 text-white">
                    <Link to="/" className="flex items-center gap-1 hover:text-orange-400">
                        <FaHome /> Home
                    </Link>
                    <Link to="/login" className="flex items-center gap-1 hover:text-orange-400">
                        <FaSignInAlt /> Login
                    </Link>
                    <Link to="/createuser" className="flex items-center gap-1 bg-orange-500 px-4 py-1 rounded-full hover:bg-orange-600">
                        <FaUserPlus /> Sign Up
                    </Link>
                </div>

                {/* Hamburger menu for mobile */}
                <Link onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </Link>
            </div>

            {/* Mobile Menu (Search and My Orders removed) */}
            {menuOpen && (
                <div className="md:hidden mt-3 space-y-3 text-white flex flex-col">
                    <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-orange-400">
                        <FaHome /> Home
                    </Link>
                    <Link to="/login" className="flex items-center gap-2 hover:text-orange-400">
                        <FaSignInAlt /> Login
                    </Link>
                    <Link to="/createuser" className="flex items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded-full hover:bg-orange-600">
                        <FaUserPlus /> Sign Up
                    </Link>
                </div>
            )}
        </nav>
    );
}
