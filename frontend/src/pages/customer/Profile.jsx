import { useEffect, useState } from "react";

import API from "../../api/api";
import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Card,
    ErrorState,
    EmptyState,
    CardSkeleton,
    Button
} from "../../components/ui";

function Profile() {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = () => {

        setLoading(true);
        setError("");

        API.get("/users/profile")
            .then(res => {
                setUser(res.data);
            })
            .catch(() => {
                setError("Unable to load profile.");
            })
            .finally(() => {
                setLoading(false);
            });

    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="container">

                <Navbar />

                <PageHeader
                    title="Customer Profile"
                    subtitle="Loading profile..."
                />

                <CardSkeleton />

            </div>
        );
    }

    if (error) {
        return (
            <div className="container">

                <Navbar />

                <ErrorState
                    title="Profile unavailable"
                    description={error}
                    onRetry={fetchProfile}
                />

            </div>
        );
    }

    if (!user) {
        return (
            <div className="container">

                <Navbar />

                <EmptyState
                    title="Profile unavailable"
                    description="No profile information could be found."
                />

            </div>
        );
    }

    const initials = user.name
        ?.split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="Customer Profile"
                subtitle="View your account information"
                actions={
                    <Button
                        variant="secondary"
                        onClick={fetchProfile}
                    >
                        Refresh
                    </Button>
                }
            />

            <Card
                title="Account Information"
                subtitle="Your registered profile details"
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "24px"
                    }}
                >

                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: "#2563eb",
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            fontSize: 22
                        }}
                    >
                        {initials}
                    </div>

                    <div>
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                    </div>

                </div>

                <div className="preview-item">
                    <span>Name</span>
                    <strong>{user.name}</strong>
                </div>

                <div className="preview-item">
                    <span>Email</span>
                    <strong>{user.email}</strong>
                </div>

                <div className="preview-item">
                    <span>Current Balance</span>
                    <strong>
                        ₹ {Number(user.balance).toLocaleString()}
                    </strong>
                </div>

                <div className="preview-item">
                    <span>Account Status</span>
                    <strong>
                        {user.is_active ? "Active" : "Inactive"}
                    </strong>
                </div>

                <div className="preview-item">
                    <span>Role</span>
                    <strong>{user.role}</strong>
                </div>

                {user.created_at && (
                    <div className="preview-item">
                        <span>Member Since</span>
                        <strong>
                            {new Date(user.created_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </strong>
                    </div>
                )}

                <div
                    style={{
                        marginTop: 24,
                        padding: 12,
                        background: "#f8fafc",
                        borderRadius: 8,
                        color: "#555"
                    }}
                >
                    This information is read-only. Contact your bank if any
                    profile details need to be updated.
                </div>

            </Card>

        </div>

    );

}

export default Profile;