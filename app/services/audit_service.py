from app.models.audit_log import AuditLog


def create_audit_log(
    db,
    user_id,
    action,
    details
):
    try:

        log = AuditLog(
            user_id=user_id,
            action=action,
            details=details
        )

        db.add(log)
        db.commit()

    except Exception as e:

        db.rollback()

        print(
            f"Audit log failed: {e}"
        )