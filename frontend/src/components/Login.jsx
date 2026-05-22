import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthNavbar from './AuthNavbar';
import { useState } from 'react';


const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic frontend validation
        if (!credentials.email || !credentials.password) {
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

        // console.log(JSON.stringify({
        //     email: credentials.email,
        //     password: credentials.password,
        // }))
        try {
            const response = await fetch(`http://localhost:3000/api/loginuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                })
            });

            const json = await response.json();
            // console.log(json);

            if (!json.success) {
                alert("❌ " + (json.message || "Enter valid credentials!"));
            } else {
                alert("✅ Account created successfully!");
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authtoken", json.authtoken);
                // console.log(localStorage.getItem("authtoken"));
                navigate("/");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Something went wrong. Please try again later.");
        }
    };


    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <AuthNavbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-100 to-yellow-100 px-4">
                <div className="backdrop-blur-md bg-gray-900 bg-opacity-80 p-10 mb-10 rounded-2xl shadow-2xl w-full max-w-md text-white">
                    <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-6">Welcome Back 👋</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm text-gray-300">Email Address</label>
                            <input
                                type="email"
                                onChange={onChange}
                                name="email"
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
                                placeholder="••••••••"
                                className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-md text-center mt-6 text-gray-300">
                        I'm a new user{' '}
                        <Link to="/createuser" className="text-orange-400 text-md hover:underline font-bold">
                            Createuser
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
