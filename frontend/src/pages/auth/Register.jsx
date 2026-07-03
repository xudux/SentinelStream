import { useState, useMemo } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Info } from "lucide-react";

import {
    Card,
    Button,
    ErrorState,
    Input,
    Checkbox,
    Progress,
    Tooltip
} from "../../components/ui";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Password strength (unchanged logic, just cleaner naming)
    const passwordStrength = useMemo(() => {
        let score = 0;

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[@$!%*?&.#^()_\-+=]/.test(password)) score++;

        return (score / 5) * 100;
    }, [password]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!agree) {
            setError("Please accept Terms & Privacy Policy.");
            return;
        }

        setLoading(true);

        try {
            await API.post("/auth/register", {
                name: name.trim(),
                email: email.trim(),
                password
            });

            navigate("/login", {
                state: { registered: true }
            });

        } catch (err) {
            setError(
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const passwordRules = (
        <div style={{ fontSize: "12px", lineHeight: "1.5" }}>
            Must include:
            <br />• Uppercase letter
            <br />• Lowercase letter
            <br />• Number
            <br />• Special character
            <br />• Minimum 8 characters
        </div>
    );

    const isSubmitDisabled =
        loading ||
        !agree ||
        !name.trim() ||
        !email.trim() ||
        !password ||
        !confirmPassword;

    return (
        <div className="login-container">
            <div className="login-wrapper">

                {error && (
                    <ErrorState
                        title="Registration Failed"
                        description={error}
                    />
                )}

                <Card className="login-card">

                    <div className="login-logo">
                        <ShieldCheck size={42} />
                    </div>

                    <div className="login-header">
                        <h1>SentinelStream</h1>
                        <p>Create your account</p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                    >
                        <Input
                            label="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* PASSWORD FIELD */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>

                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span style={{ fontSize: "13px", fontWeight: 500 }}>
                                    Password
                                </span>

                                <Tooltip text={passwordRules}>
                                    <span style={{ cursor: "pointer", display: "flex" }}>
                                        <Info size={14} opacity={0.7} />
                                    </span>
                                </Tooltip>
                            </div>

                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Progress value={passwordStrength} />

                        <Input
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Checkbox
                            label="I agree to Terms & Privacy Policy"
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                            disabled={isSubmitDisabled}
                        >
                            Register
                        </Button>

                        {/* LOGIN LINK */}
                        <div style={{ textAlign: "center", marginTop: "6px" }}>
                            <span style={{ fontSize: "13px", opacity: 0.7 }}>
                                Already have an account?
                            </span>

                            <div>
                                <button
                                    type="button"
                                    className="register-link-btn"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            </div>
                        </div>

                    </form>

                </Card>

            </div>
        </div>
    );
}

export default Register;