import React, { useState } from 'react';
import AuthNavbar from './AuthNavbar';
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.name || !credentials.email || !credentials.password || !credentials.geolocation) {
            alert("⚠️ All fields are required.");
            return;
        }

        // Email format validation (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
            alert("⚠️ Please enter a valid email address.");
            return;
        }

        if (credentials.password.length < 6) {
            alert("⚠️ Password must be at least 6 characters long.");
            return;
        }
        // console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation }))
        const response = await fetch("http://localhost:3000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })

        const text = await response.text();
        let json = {};
        try {
            json = text ? JSON.parse(text) : {};
            console.log(json)
        } catch (err) {
            console.error("❌ Failed to parse response JSON", err);
            alert("Server error, please try again later.");
            return;
        }
        if (!json.success) {
            alert("❌ " + (json.message || "Enter valid credentials!"));
        } else {
            alert("✅ Account created successfully! Please Goto Login Page");
        }
    }
    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <AuthNavbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100 px-4">
                <div className="backdrop-blur-md bg-gray-900 bg-opacity-80 p-10 rounded-2xl shadow-2xl w-full max-w-md text-white">
                    <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-6">Create Your Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm text-gray-300">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={credentials.name}
                                placeholder="John Doe"
                                onChange={onChange}
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={onChange}
                                value={credentials.email}
                                placeholder="you@example.com"
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-300">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={onChange}
                                value={credentials.password}
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div><div>
                            <label className="text-sm text-gray-300">Address</label>
                            <input
                                type="text"
                                name="geolocation"
                                onChange={onChange}
                                placeholder="Washington DC"
                                value={credentials.geolocation}
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className="text-sm text-center mt-6 text-gray-300">
                        Already have an account?{' '}
                        <Link to="/login" className="text-orange-400 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
