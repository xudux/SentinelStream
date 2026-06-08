# Request and Response Examples

## POST /transaction

Request

{
  "amount": 5000,
  "location": "Hyderabad",
  "merchant": "Amazon"
}

Response

{
  "transaction_id": 1,
  "status": "approved",
  "risk_score": 0.12
}

## GET /balance

Response

{
  "balance": 12000
}