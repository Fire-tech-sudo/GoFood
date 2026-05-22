import React, { useState } from 'react';
import {
    FaUtensils,
    FaSearch,
    FaShoppingCart,
    FaHome,
    FaBox,
    FaSignOutAlt,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './ ContentReducer';



export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const cart = useCart();
    const cartCount = cart.length;




    const handelLogout = () => {
        const confirmLogout = window.confirm("Are you sure, you want to logout? ")
        if (confirmLogout) {
            localStorage.removeItem("authtoken");
            navigate("/login");
            alert("You have been logged out.");
        }
    }

    return (
        <nav className="bg-gray-900 shadow-md px-4 py-3 w-full">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-2 cursor-pointer text-white">
                    <FaUtensils className="text-orange-400 text-2xl" />
                    <span className="text-2xl font-extrabold">Go<span className='text-orange-400'>Food</span></span>
                </div>
                {/* Search bar - hidden on small screens */}
                <div className="hidden md:flex flex-grow max-w-lg mx-4 relative">
                    <FaSearch className="absolute top-3 left-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search food or restaurants..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-4 text-white">
                    <Link to="/" className="flex items-center gap-1 hover:text-orange-400">
                        <FaHome /> Home
                    </Link>
                    <Link to="/myorders" className="flex items-center gap-1 hover:text-orange-400">
                        <FaBox /> My Orders
                    </Link>
                    <Link to="/cart" className="relative flex items-center bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600">
                        <FaShoppingCart className="mr-1" />
                        Cart
                        <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-1.5 py-0.5">
                            {cartCount}
                        </span>
                    </Link>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-orange-400" onClick={handelLogout}>
                        <FaSignOutAlt /> Logout
                    </div>
                </div>

                {/* Hamburger menu for mobile */}
                <Link onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </Link>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-3 space-y-3 text-white flex flex-col">
                    <div className="flex items-center space-x-2">
                        <FaSearch className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-gray-800 text-white px-3 py-1 rounded-full border border-gray-600 focus:outline-none"
                        />
                    </div>
                    <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-orange-400">
                        <FaHome /> Home
                    </Link>
                    <Link to="/myorders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-orange-400">
                        <FaBox /> My Orders
                    </Link>
                    <Link to="/cart" className="flex items-center gap-2 bg-orange-500 text-white px-3 py-1 rounded-full hover:bg-orange-600">
                        <FaShoppingCart /> Cart
                    </Link>
                    <div className="flex items-center cursor-pointer gap-2 hover:text-orange-400" onClick={handelLogout}>
                        <FaSignOutAlt /> Logout
                    </div>
                </div>
            )}
        </nav>
    );
}
