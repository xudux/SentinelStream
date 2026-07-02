import { Link } from "react-router-dom";

import StatsCard from "../components/common/StatsCard";

import {
    Badge,
    Button,
    Card,
    ThemeToggle
} from "../components/ui";

function Landing() {

    return (

        <div className="landing-page">

            <div className="container">

                <ThemeToggle />

                {/* Hero */}
                <section className="landing-hero">

                    <div className="landing-hero-content">

                        <Badge variant="primary">
                            AI Powered Fraud Detection Platform
                        </Badge>

                        <h1 className="landing-title">
                            Protect Every Transaction
                            <span> Before Fraud Happens.</span>
                        </h1>

                        <p className="landing-description">

                            SentinelStream is a real-time fraud detection platform
                            capable of analyzing thousands of financial transactions
                            per second using machine learning, streaming pipelines,
                            and automated investigation workflows.

                        </p>

                        <div className="landing-actions">

                            <Link to="/login">

                                <Button>

                                    Login

                                </Button>

                            </Link>

                        </div>

                    </div>

                    <div className="landing-hero-visual">

                        <Card title="Live Fraud Engine">

                            <div className="hero-stat">

                                <span>Transactions/sec</span>

                                <strong>120,000+</strong>

                            </div>

                            <div className="hero-stat">

                                <span>Detection Accuracy</span>

                                <strong>99.8%</strong>

                            </div>

                            <div className="hero-stat">

                                <span>Average Latency</span>

                                <strong>8 ms</strong>

                            </div>

                            <div className="hero-stat">

                                <span>Active Investigations</span>

                                <strong>42</strong>

                            </div>

                        </Card>

                    </div>

                </section>

                {/* Stats */}
                <section className="landing-stats">

                    <StatsCard
                        title="Transactions / sec"
                        value="120K+"
                    />

                    <StatsCard
                        title="Detection Accuracy"
                        value="99.98%"
                    />

                    <StatsCard
                        title="Average Latency"
                        value="8 ms"
                    />

                    <StatsCard
                        title="Availability"
                        value="24/7"
                    />

                </section>

                {/* Features */}
                <section className="landing-features">

                    <div className="landing-section-header">

                        <Badge variant="info">
                            Platform Features
                        </Badge>

                        <h2>
                            Everything needed for enterprise fraud detection
                        </h2>

                        <p>
                            SentinelStream combines machine learning, event streaming,
                            investigation workflows and real-time monitoring into a
                            single platform.
                        </p>

                    </div>

                    <div className="landing-feature-grid">

                        <Card title="Real-Time Detection">

                            <p>
                                Analyze thousands of financial transactions every second
                                with extremely low latency.
                            </p>

                        </Card>

                        <Card title="Machine Learning">

                            <p>
                                Detect suspicious behavior using trained fraud
                                classification models.
                            </p>

                        </Card>

                        <Card title="Investigation Workflow">

                            <p>
                                Automatically create fraud investigations with analyst
                                assignment and resolution tracking.
                            </p>

                        </Card>

                        <Card title="Streaming Architecture">

                            <p>
                                Powered by Kafka, Redis, PostgreSQL and FastAPI for
                                scalable event-driven processing.
                            </p>

                        </Card>

                        <Card title="Role-Based Access">

                            <p>
                                Dedicated dashboards for administrators, analysts and
                                customers.
                            </p>

                        </Card>

                        <Card title="Live Monitoring">

                            <p>
                                Monitor fraud rates, risk scores and transaction status
                                through executive dashboards.
                            </p>

                        </Card>

                    </div>

                </section>

                {/* Architecture */}
                <section className="landing-architecture">

                    <div className="landing-section-header">

                        <Badge variant="primary">
                            System Architecture
                        </Badge>

                        <h2>
                            Event-driven fraud detection pipeline
                        </h2>

                        <p>
                            Every transaction passes through a scalable streaming
                            architecture before reaching the banking ledger.
                        </p>

                    </div>

                    <div className="architecture-flow">

                        <Card title="Customer">
                            <p>Initiates transaction</p>
                        </Card>

                        <div className="architecture-arrow">
                            →
                        </div>

                        <Card title="API Gateway">
                            <p>Validates & forwards requests</p>
                        </Card>

                        <div className="architecture-arrow">
                            →
                        </div>

                        <Card title="Kafka Stream">
                            <p>Processes transaction events</p>
                        </Card>

                        <div className="architecture-arrow">
                            →
                        </div>

                        <Card title="ML Fraud Engine">
                            <p>Calculates fraud probability</p>
                        </Card>

                        <div className="architecture-arrow">
                            →
                        </div>

                        <Card title="Investigation Engine">
                            <p>Creates fraud investigations</p>
                        </Card>

                        <div className="architecture-arrow">
                            →
                        </div>

                        <Card title="Dashboard">
                            <p>Analysts review suspicious activity</p>
                        </Card>

                    </div>

                </section>

                {/* Dashboard Preview */}
                <section className="landing-preview">

                    <div className="landing-section-header">

                        <Badge variant="success">
                            Executive Dashboard
                        </Badge>

                        <h2>
                            Built for fraud analysts
                        </h2>

                        <p>
                            Monitor fraud events, system health and transaction activity
                            from one unified dashboard.
                        </p>

                    </div>

                    <div className="landing-dashboard-preview">

                        {/* KPI Cards */}

                        <div className="landing-dashboard-stats">

                            <StatsCard
                                title="Transactions Today"
                                value="2.4M"
                            />

                            <StatsCard
                                title="Fraud Alerts"
                                value="318"
                            />

                            <StatsCard
                                title="Investigations"
                                value="42"
                            />

                            <StatsCard
                                title="System Health"
                                value="99.99%"
                            />

                        </div>

                        {/* Dashboard Panels */}

                        <div className="landing-dashboard-grid">

                            <Card title="Recent Alerts">

                                <div className="preview-item">

                                    <span>Transaction #42191</span>

                                    <Badge variant="danger">
                                        BLOCKED
                                    </Badge>

                                </div>

                                <div className="preview-item">

                                    <span>Transaction #42187</span>

                                    <Badge variant="warning">
                                        FLAGGED
                                    </Badge>

                                </div>

                                <div className="preview-item">

                                    <span>Transaction #42180</span>

                                    <Badge variant="success">
                                        APPROVED
                                    </Badge>

                                </div>

                            </Card>

                            <Card title="Fraud Engine">

                                <div className="preview-metric">

                                    <span>ML Accuracy</span>

                                    <strong>99.98%</strong>

                                </div>

                                <div className="preview-metric">

                                    <span>Average Latency</span>

                                    <strong>8 ms</strong>

                                </div>

                                <div className="preview-metric">

                                    <span>Events/sec</span>

                                    <strong>120K</strong>

                                </div>

                            </Card>

                        </div>

                    </div>

                </section>

                {/* Technology */}
                <section className="landing-tech">

                    <div className="landing-section-header">

                        <Badge variant="warning">
                            Technology Stack
                        </Badge>

                        <h2>
                            Built with modern cloud-native technologies
                        </h2>

                        <p>
                            SentinelStream combines scalable backend services,
                            real-time event streaming and modern frontend tooling
                            into a production-inspired architecture.
                        </p>

                    </div>

                    <div className="landing-tech-grid">

                        <Card title="Frontend">

                            <div className="tech-badges">

                                <Badge>React</Badge>
                                <Badge>Vite</Badge>
                                <Badge>Axios</Badge>
                                <Badge>Recharts</Badge>

                            </div>

                        </Card>

                        <Card title="Backend">

                            <div className="tech-badges">

                                <Badge>FastAPI</Badge>
                                <Badge>Python</Badge>
                                <Badge>SQLAlchemy</Badge>

                            </div>

                        </Card>

                        <Card title="Streaming">

                            <div className="tech-badges">

                                <Badge>Kafka</Badge>
                                <Badge>Redis</Badge>

                            </div>

                        </Card>

                        <Card title="Database">

                            <div className="tech-badges">

                                <Badge>PostgreSQL</Badge>
                                <Badge>Alembic</Badge>

                            </div>

                        </Card>

                        <Card title="Machine Learning">

                            <div className="tech-badges">

                                <Badge>Scikit-Learn</Badge>
                                <Badge>Pandas</Badge>
                                <Badge>NumPy</Badge>

                            </div>

                        </Card>

                        <Card title="Infrastructure">

                            <div className="tech-badges">

                                <Badge>Docker</Badge>
                                <Badge>JWT</Badge>
                                <Badge>REST API</Badge>

                            </div>

                        </Card>

                    </div>

                </section>

                {/* CTA */}
                <section className="landing-cta">

                    <Card className="landing-cta-card">

                        <Badge variant="success">
                            Get Started
                        </Badge>

                        <h2>
                            Ready to secure every transaction?
                        </h2>

                        <p>

                            Experience how SentinelStream detects fraud in real time,
                            assists analysts with investigations, and protects customers
                            using machine learning and event-driven architecture.

                        </p>

                        <div className="landing-actions">

                            <Link to="/login">

                                <Button>

                                    Login

                                </Button>

                            </Link>

                        </div>

                    </Card>

                </section>

                {/* Footer */}
                <footer className="landing-footer">

                    <div className="landing-footer-brand">

                        <h3>
                            SentinelStream
                        </h3>

                        <p>
                            Enterprise-grade real-time fraud detection platform built for
                            modern financial institutions.
                        </p>

                    </div>

                    <div className="landing-footer-links">

                        <div>

                            <h4>
                                Platform
                            </h4>

                            <Link to="/login">Dashboard</Link>

                            <Link to="/login">Analytics</Link>

                            <Link to="/login">Fraud Detection</Link>

                        </div>

                        <div>

                            <h4>
                                Technology
                            </h4>

                            <p>FastAPI</p>

                            <p>Kafka</p>

                            <p>Machine Learning</p>

                        </div>

                        <div>

                            <h4>
                                Resources
                            </h4>

                            <p>Documentation</p>

                            <p>Architecture</p>

                            <p>Support</p>

                        </div>

                    </div>

                    <div className="landing-footer-bottom">

                        © 2026 SentinelStream • Real-Time Fraud Detection Platform

                    </div>

                </footer>

            </div>

        </div>

    );

}

export default Landing;