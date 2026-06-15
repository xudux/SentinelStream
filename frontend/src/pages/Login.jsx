import { useState } from "react";
import API from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();

        formData.append("username", email);
        formData.append("password", password);

        try {
            const response = await API.post(
                "/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "application/x-www-form-urlencoded"
                    }
                }
            );

            const token = response.data.access_token;

            const decoded = jwtDecode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("role", decoded.role);
            localStorage.setItem("email", decoded.sub);

            if (
                decoded.role === "ADMIN" ||
                decoded.role === "FRAUD_ANALYST"
            ) {
                navigate("/dashboard");
            }
            else {
                navigate("/transactions");
            }

        } catch (error) {
            console.error(error);
            alert("Login Failed");
        }
    };

    return (
        <div className="login-container">
            <form
                className="login-form"
                onSubmit={handleLogin}
            >
                <h2>SentinelStream Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;