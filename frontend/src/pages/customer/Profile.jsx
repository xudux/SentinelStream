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

            </Card>

        </div>

    );

}

export default Profile;