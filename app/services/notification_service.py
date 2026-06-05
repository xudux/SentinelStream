def send_fraud_alert(
    email: str,
    transaction_id: int,
    risk_score: int
):
    print(
        f"""
        FRAUD ALERT

        User: {email}
        Transaction: {transaction_id}
        Risk Score: {risk_score}

        Immediate review recommended.
        """
    )