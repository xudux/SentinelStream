import { useEffect, useState } from "react";

import API from "../../api/api";

import Navbar from "../../components/common/Navbar";

import {
    PageHeader,
    Button,
    Badge,
    EmptyState,
    ErrorState,
    Card,
    CardSkeleton,
    Input,
    Select,
    Modal,
    Toast,
    Spinner,
    Alert
} from "../../components/ui";

function Rules() {

    const [rules, setRules] = useState([]);

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(true);

    const [creating, setCreating] = useState(false);

    const [formError, setFormError] = useState("");

    const [toast, setToast] = useState(null);

    const [deleting, setDeleting] = useState(false);

    const [deleteModal, setDeleteModal] = useState({
        open: false,
        rule: null,
    });

    const [form, setForm] = useState({
        name: "",
        rule_type: "",
        rule_value: "",
        risk_score: ""
    });

    useEffect(() => {
        fetchRules();
    }, []);

    const fetchRules = () => {
        setError("");
        setLoading(true);

        API.get("/rules")
            .then(res => {
                setRules([...res.data].sort((a, b) => b.id - a.id));
            })
            .catch(() => {
                setError("Unable to load fraud rules.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="container">
                <Navbar />

                <PageHeader
                    title="Fraud Rules Engine"
                    subtitle="Configure fraud detection behaviour and risk scoring"
                />

                <div className="analyst-cards-grid">
                    <CardSkeleton />
                    <CardSkeleton />
                </div>

                <br />

                <CardSkeleton />
            </div>
        );
    }

    const toggleRule = (id) => {
        setError("");

        API.put(`/rules/${id}/toggle`)
            .then(() => {

                setToast({
                    type: "success",
                    title: "Updated",
                    message: "Rule status updated."
                });

                fetchRules();

            })
            .catch(() => {
                setError("Unable to update fraud rule.");
            });
    };

    const confirmDeleteRule = (rule) => {
        setDeleteModal({
            open: true,
            rule,
        });
    };

    const deleteRule = () => {

        if (!deleteModal.rule) return;

        setDeleting(true);

        API.delete(`/rules/${deleteModal.rule.id}`)
            .then(() => {

                setToast({
                    type: "success",
                    title: "Rule Deleted",
                    message: "Fraud rule deleted successfully.",
                });

                fetchRules();
            })
            .catch(() => {
                setError("Unable to delete fraud rule.");
            })
            .finally(() => {
                setDeleting(false);

                setDeleteModal({
                    open: false,
                    rule: null,
                });
            });
    };

    const createRule = () => {
        setError("");
        setFormError("");

        if (
            !form.name.trim() ||
            !form.rule_type ||
            !form.rule_value ||
            !form.risk_score
        ) {
            setFormError("Please fill in all fields.");
            return;
        }

        const riskScore = Number(form.risk_score);

        if (Number.isNaN(riskScore) || riskScore < 0 || riskScore > 100) {
            setFormError("Risk Score must be between 0 and 100.");
            return;
        }

        if (
            form.rule_type === "AMOUNT" &&
            (isNaN(Number(form.rule_value)) || Number(form.rule_value) <= 0)
        ) {
            setFormError("Amount Threshold must be a valid number.");
            return;
        }

        setCreating(true);

        API.post("/rules/", {
            name: form.name,
            rule_type: form.rule_type,
            rule_value: form.rule_value,
            risk_score: riskScore,
        })
            .then(() => {

                setToast({
                    type: "success",
                    title: "Rule Created",
                    message: "Fraud rule created successfully."
                });

                fetchRules();

                setForm({
                    name: "",
                    rule_type: "",
                    rule_value: "",
                    risk_score: "",
                });

            })
            .catch(() => {
                setError("Unable to create fraud rule.");
            })
            .finally(() => {
                setCreating(false);
            });
    };

    return (
        <div className="container">
            <Navbar />

            <PageHeader
                title="Fraud Rules Engine"
                subtitle="Configure fraud detection behaviour and risk scoring"
                actions={
                    <Button variant="secondary" onClick={fetchRules}>
                        Refresh
                    </Button>
                }
            />

            {toast && (
                <Toast
                    type={toast.type}
                    title={toast.title}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            {error && (
                <ErrorState
                    title="Rules unavailable"
                    description={error}
                    onRetry={fetchRules}
                />
            )}

            <Card
                title="Create Fraud Rule"
                subtitle="Configure a new rule to detect suspicious transactions"
            >

                {formError && (
                    <Alert
                        variant="danger"
                        title="Validation Error"
                    >
                        {formError}
                    </Alert>
                )}

                <div className="rule-form">

                    <Input
                        label="Rule Name"
                        value={form.name}
                        onChange={e =>
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }
                    />

                    <Select
                        label="Rule Type"
                        value={form.rule_type}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                rule_type: e.target.value,
                                rule_value: "",
                            })
                        }
                    >
                        <option value="">Select Rule Type</option>
                        <option value="COUNTRY">COUNTRY</option>
                        <option value="MERCHANT">MERCHANT</option>
                        <option value="AMOUNT">AMOUNT</option>
                    </Select>

                    {form.rule_type === "COUNTRY" ? (
                        <Select
                            label="Country"
                            value={form.rule_value}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rule_value: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Country</option>
                            <option value="Russia">Russia</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="North Korea">North Korea</option>
                        </Select>
                    ) : form.rule_type === "MERCHANT" ? (
                        <Select
                            label="Merchant"
                            value={form.rule_value}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rule_value: e.target.value,
                                })
                            }
                        >
                            <option value="">Select Merchant</option>
                            <option value="CryptoExchange">CryptoExchange</option>
                            <option value="DarkWebMarket">DarkWebMarket</option>
                            <option value="UnknownVendor">UnknownVendor</option>
                        </Select>
                    ) : (
                        <Input
                            label="Amount Threshold"
                            value={form.rule_value}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rule_value: e.target.value,
                                })
                            }
                        />
                    )}

                    <Input
                        label="Risk Score"
                        type="number"
                        value={form.risk_score}
                        onChange={e =>
                            setForm({
                                ...form,
                                risk_score: e.target.value
                            })
                        }
                    />

                    <Button onClick={createRule} disabled={creating}>
                        {creating ? (
                            <>
                                <Spinner /> Creating...
                            </>
                        ) : (
                            "Create Rule"
                        )}
                    </Button>

                </div>
            </Card>

            <Card
                title="Fraud Rules"
                subtitle="Manage fraud detection rules and their status"
            >
                <table className="ui-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Risk</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rules.length === 0 ? (
                            <tr>
                                <td colSpan="7">
                                    <EmptyState
                                        title="No fraud rules"
                                        description="Create your first fraud rule to begin monitoring transactions."
                                    />
                                </td>
                            </tr>
                        ) : (
                            rules.map(rule => (
                                <tr key={rule.id}>
                                    <td>{rule.id}</td>
                                    <td>{rule.name}</td>
                                    <td>{rule.rule_type}</td>
                                    <td>{rule.rule_value}</td>
                                    <td>
                                        <Badge
                                            variant={
                                                rule.risk_score >= 80
                                                    ? "danger"
                                                    : rule.risk_score >= 50
                                                    ? "warning"
                                                    : "success"
                                            }
                                        >
                                            +{rule.risk_score}
                                        </Badge>
                                    </td>
                                    <td>
                                        <Badge
                                            variant={rule.is_active ? "success" : "danger"}
                                        >
                                            {rule.is_active ? "Active" : "Disabled"}
                                        </Badge>
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => toggleRule(rule.id)}
                                            >
                                                {rule.is_active ? "Disable" : "Enable"}
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => confirmDeleteRule(rule)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </Card>

            <Modal
                open={deleteModal.open}
                onClose={() =>
                    setDeleteModal({
                        open: false,
                        rule: null
                    })
                }
                title="Delete Fraud Rule"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() =>
                                setDeleteModal({
                                    open: false,
                                    rule: null
                                })
                            }
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="danger"
                            onClick={deleteRule}
                            disabled={deleting}
                        >
                            {deleting ? (
                                <>
                                    <Spinner /> Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </>
                }
            >

                Are you sure you want to delete
                <strong> {deleteModal.rule?.name}</strong>?

                <br /><br />

                This action cannot be undone.

            </Modal>
        </div>
    );
}

export default Rules;