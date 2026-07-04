from app.models.fraud_rule import FraudRule


def calculate_risk_score(
    db,
    amount,
    merchant,
    location
):
    risk_score = 0

    merchant = merchant.strip().lower()
    location = location.strip().lower()

    rules = (
        db.query(FraudRule)
        .filter(
            FraudRule.is_active == True
        )
        .all()
    )

    for rule in rules:

        value = rule.rule_value.strip().lower()

        if (
            rule.rule_type == "COUNTRY"
            and location == value
        ):
            risk_score += rule.risk_score

        elif (
            rule.rule_type == "MERCHANT"
            and merchant == value
        ):
            risk_score += rule.risk_score

        elif (
            rule.rule_type == "AMOUNT"
        ):
            try:
                threshold = float(rule.rule_value)

                if amount > threshold:
                    risk_score += rule.risk_score

            except ValueError:
                pass

    return risk_score




def get_transaction_status(

    risk_score

):

    if risk_score >= 70:

        return "blocked"

    elif risk_score >= 40:

        return "flagged"

    else:

        return "approved"

