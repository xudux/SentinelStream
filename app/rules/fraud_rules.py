HIGH_RISK_COUNTRIES = [

    "Nigeria",
    "Russia",
    "North Korea"

]


HIGH_RISK_MERCHANTS = [

    "CryptoExchange",
    "DarkWebMarket",
    "UnknownVendor"

]



def calculate_risk_score(

        amount,
        merchant,
        location

):


    risk_score = 0


    # Large transaction

    if amount > 5000:

        risk_score += 40


    # Suspicious country

    if location in HIGH_RISK_COUNTRIES:

        risk_score += 30


    # Suspicious merchant

    if merchant in HIGH_RISK_MERCHANTS:

        risk_score += 30


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