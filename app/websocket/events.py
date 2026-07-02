from enum import Enum


class EventType(str, Enum):
    """
    Standardized event types used across SentinelStream.
    """

    # Transactions
    TRANSACTION_CREATED = "transaction_created"
    TRANSACTION_UPDATED = "transaction_updated"
    TRANSACTION_APPROVED = "transaction_approved"
    TRANSACTION_DECLINED = "transaction_declined"

    # Fraud
    FRAUD_DETECTED = "fraud_detected"
    FRAUD_UPDATED = "fraud_updated"

    # Rules
    RULE_TRIGGERED = "rule_triggered"
    RULE_CREATED = "rule_created"
    RULE_UPDATED = "rule_updated"

    # Investigations
    INVESTIGATION_CREATED = "investigation_created"
    INVESTIGATION_ASSIGNED = "investigation_assigned"
    INVESTIGATION_UPDATED = "investigation_updated"
    INVESTIGATION_CLOSED = "investigation_closed"

    # Notifications
    NOTIFICATION = "notification"

    # Dashboard
    DASHBOARD_UPDATE = "dashboard_update"

    # System
    SYSTEM_HEALTH = "system_health"

    # Queue
    QUEUE_STATUS = "queue_status"

    # Audit
    AUDIT_LOG = "audit_log"

    # ML
    ML_PREDICTION = "ml_prediction"
    ML_MODEL_UPDATED = "ml_model_updated"

    # Generic
    HEARTBEAT = "heartbeat"