import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import API from "../../api/api";
import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Card,
    Button,
    Badge,
    ErrorState,
    PageSkeleton
} from "../../components/ui";

function InvestigationDetails() {
    const { id } = useParams();

    const [investigation, setInvestigation] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [status, setStatus] = useState("");
    const [notes, setNotes] = useState("");
    const [priority, setPriority] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [resolution, setResolution] = useState("");

    const fetchInvestigation = useCallback(() => {
        setLoading(true);
        setError("");

        API.get(`/investigations/${id}`)
            .then(res => {
                setInvestigation(res.data);

                setStatus(res.data.status);
                setNotes(res.data.notes || "");
                setPriority(res.data.priority);
                setAssignedTo(res.data.assigned_to || "");
                setResolution(res.data.resolution || "");
            })
            .catch(() => {
                setError("Unable to load investigation.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        fetchInvestigation();
    }, [fetchInvestigation]);

    const updateCase = () => {
        setError("");

        API.put(`/investigations/${id}`, {
            status,
            notes,
            priority,
            resolution,
            assigned_to: assignedTo
        })
            .then(()=> {
                fetchInvestigation();
            })
            .catch(() => {
                setError("Unable to update investigation.");
            });
    };

    if (loading) {
        return (
            <div className="container">
                <Navbar />
                <PageSkeleton />
            </div>
        );
    }

    if (error && !investigation) {
        return (
            <div className="container">
                <Navbar />
                <ErrorState
                    title="Investigation unavailable"
                    description={error}
                    onRetry={fetchInvestigation}
                />
            </div>
        );
    }

    const getBadgeVariant = (value) => {

        switch (value) {

            case "HIGH":
                return "danger";

            case "MEDIUM":
                return "warning";

            case "LOW":
                return "success";

            case "OPEN":
                return "warning";

            case "UNDER_REVIEW":
                return "primary";

            case "CLOSED":
                return "success";

            default:
                return "primary";

        }

    };

    return (
        <div className="container">
            <Navbar />

            <PageHeader
                title={`Investigation #${investigation.id}`}
                subtitle="Review, assign and update fraud investigation details"
            />

            {/* Investigation Info */}
            <Card title="Investigation Information">
                <div className="card-content space-y-3">
                    <p>
                        <strong>Fraud Event:</strong>{" "}
                        {investigation.fraud_event_id}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <Badge variant={getBadgeVariant(status)}>
                            {status}
                        </Badge>
                    </p>

                    <p>
                        <strong>Priority:</strong>{" "}
                        <Badge variant={getBadgeVariant(priority)}>
                            {priority}
                        </Badge>
                    </p>
                </div>
            </Card>

            {/* Assignment */}
            <Card title="Assignment">
                <div className="form-group">
                    <label>Priority</label>
                    <select
                        className="ui-select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="LOW">LOW</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HIGH">HIGH</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Assigned Analyst</label>
                    <input
                        className="ui-input"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                    />
                </div>
            </Card>

            {/* Resolution */}
            <Card title="Resolution">
                <textarea
                    className="ui-textarea"
                    rows="5"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                />
            </Card>

            {/* Update Investigation */}
            <Card title="Update Investigation">
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="ui-select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="OPEN">OPEN</option>
                        <option value="UNDER_REVIEW">UNDER REVIEW</option>
                        <option value="CLOSED">CLOSED</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Notes</label>
                    <textarea
                        className="ui-textarea"
                        rows="5"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>

                <div className="table-actions">
                    <Button variant="primary" onClick={updateCase}>
                        Save Changes
                    </Button>
                </div>

                {error && (
                    <ErrorState
                        title="Update Failed"
                        description={error}
                        onRetry={updateCase}
                    />
                )}
            </Card>
        </div>
    );
}

export default InvestigationDetails;