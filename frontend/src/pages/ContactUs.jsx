import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import NavBar from '../components/NavBar';

const ContactUs = () => {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-200 px-4 py-12 flex items-center justify-center">
                <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-2xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-4xl font-extrabold text-orange-500 mb-4">Get in Touch</h2>
                        <p className="text-gray-300 mb-6">
                            Have questions or feedback? We'd love to hear from you. Fill out the form or reach us directly.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaPhoneAlt className="text-orange-400" />
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-orange-400" />
                                <span>support@gofood.com</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-orange-400 mt-1" />
                                <span>123 GoFood Street, Delhi, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm mb-1">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    placeholder="Write your message..."
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 py-2 rounded-md font-semibold transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
