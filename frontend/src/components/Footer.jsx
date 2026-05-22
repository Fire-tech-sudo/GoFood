import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaUtensils } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-10 pb-5 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <FaUtensils className="text-orange-400 text-2xl" />
                        <h1 className="text-2xl font-bold text-white">Go<span className='text-orange-400'>Food</span></h1>
                    </div>
                    <p className="text-sm text-gray-400">
                        Delivering happiness with every bite! Fresh food, fast delivery, and unbeatable taste.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-md">
                        <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
                        <li><Link to="/menu" className="hover:text-orange-400">Menu</Link></li>
                        <li><Link to="/orders" className="hover:text-orange-400">My Orders</Link></li>
                        <li><Link to="/contact" className="hover:text-orange-400">Contact Us</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-400" /> 123 Food Street</li>
                        <li className="flex items-center gap-2"><FaPhoneAlt className="text-orange-400" /> +91 98765 43210</li>
                        <li className="flex items-center gap-2"><FaEnvelope className="text-orange-400" /> support@foodie.com</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Subscribe</h3>
                    <form className="flex flex-col sm:flex-row gap-2">
                        <input type="email" placeholder="Your Email" className="px-3 py-2 rounded bg-gray-800 text-white text-sm border border-gray-700" />
                        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm">Join</button>
                    </form>
                    <div className="flex mt-4 space-x-4 text-orange-400">
                        <FaFacebook className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                        <FaTwitter className="hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-5">
                © {new Date().getFullYear()} GoFood. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
