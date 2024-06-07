"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        axios
            .post("http://localhost:8081/record", { username, email, password, confirmPassword })
            .then((res) => {
                console.log(res);
                alert(res.data); // Muestra la respuesta del servidor
                if (res.data === "Usuario reconocido") {
                    router.push("/"); // Redirige a la página en blanco
                }
            })
            .catch((err) => {
                console.error("Error en la solicitud:", err);
                alert("Error en la solicitud");
            });
    };

    function handleCancel() {
        router.push("/login");
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center bg-custom">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="text-gold">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            className="form-control"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="text-gold">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="text-gold">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="text-gold">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-danger">Register</button>
                    <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default Register;