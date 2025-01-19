import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    localStorage.setItem('userEmail', form.email);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.email && form.password) {
            try {
                console.log("Submitting form:", form); 
                const response = await axios.post(
                    "http://localhost:5000/api/userRoutes/login",
                    form
                );

                console.log("Login response:", response.data); 

                if (response.status === 200) {
                    
                    if (form.email === "admin@gmail.com") {
                        navigate("/admin"); 
                    } else {
                        navigate("/user"); 
                    }
                }
            } catch (error) {
                console.error("Error during login:", error.response?.data || error.message);
                setError(
                    error.response?.data?.message || "Login Failed. Please try again."
                );
            }
        } else {
            setError("Please enter both email and password");
        }
    };

    return (
        <div
            style={{
                backgroundImage: 'url(./images/login.jpg)',
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="card p-4 shadow"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "#222",
                    borderRadius: "10px",
                }}
            >
                <h2
                    className="mb-3"
                    style={{
                        textAlign: "center",
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    Travel Story App{" "}
                    <p
                        style={{
                            margin: 0,
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Login Page
                    </p>
                </h2>

                {error && (
                    <div className="alert alert-danger text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label"
                            style={{ color: "white" }}
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            id="email"
                            placeholder="Enter Your Email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label"
                            style={{ color: "white" }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            id="password"
                            placeholder="Enter Your Password"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary w-100">
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a
                        href="/register"
                        className="text-decoration-none"
                        style={{ color: "white" }}
                    >
                        Don't have an account? Register
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
