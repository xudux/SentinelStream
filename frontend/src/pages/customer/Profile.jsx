import { useEffect, useState } from "react";

import API from "../../api/api";
import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Card,
    ErrorState,
    EmptyState,
    CardSkeleton
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
            />

            <Card
                title="Name"
                subtitle="Your full name"
            >

                <p>

                    {user.name}

                </p>

            </Card>

            <Card
                title="Email"
                subtitle="Registered email address"
            >

                <p>

                    {user.email}

                </p>

            </Card>

            <Card
                title="Balance"
                subtitle="Your current account balance"
            >

                <p>

                    ₹ {Number(user.balance).toLocaleString()}

                </p>

            </Card>

        </div>

    );

}

export default Profile;