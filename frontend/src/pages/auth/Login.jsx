import { useState } from "react";
import API from "../../api/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import {
    Card,
    Button,
    ErrorState
} from "../../components/ui";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        try {
            const response = await API.post(
                "/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            const token = response.data.access_token;
            const decoded = jwtDecode(token);

            localStorage.setItem("token", token);
            localStorage.setItem("role", decoded.role);
            localStorage.setItem("email", decoded.sub);

            if (decoded.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (decoded.role === "FRAUD_ANALYST") {
                navigate("/analyst/dashboard");
            } else {
                navigate("/customer/dashboard");
            }

        } catch (error) {
            console.error(error);
            setError(
                error?.response?.data?.message ||
                "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-wrapper">

                {error && (
                    <ErrorState
                        title="Login Failed"
                        description={error}
                    />
                )}

                <Card className="login-card">

                    <div className="login-logo">
                        <ShieldCheck size={42} />
                    </div>

                    <div className="login-header">
                        <h1>SentinelStream</h1>
                        <p>Secure platform login</p>
                    </div>

                    <form onSubmit={handleLogin}>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                className="ui-input"
                                type="email"
                                placeholder="Enter email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                className="ui-input"
                                type="password"
                                placeholder="Enter password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="login-btn"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>

                    </form>

                    <div className="login-footer">
                        SentinelStream © 2026
                    </div>

                </Card>

            </div>
        </div>
    );
}

export default Login;