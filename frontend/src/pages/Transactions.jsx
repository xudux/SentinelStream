import { useState } from "react"
import API from "../api/api";
import Navbar from "../components/Navbar"

function Transactions() {

    const [amount, setAmount] = useState("")
    const [merchant, setMerchant] = useState("")
    const [location, setLocation] = useState("")

    const [result, setResult] = useState(null)

    const submitTransaction = async (e) => {

        e.preventDefault()

        try {

            const response = await API.post(
                "/transactions/send",
                {
                    amount: Number(amount),
                    merchant,
                    location
                }
            )

            setResult(response.data)

        } catch (error) {

            setResult(
                error.response?.data || {
                    detail: "Server Error"
                }
            )

        }

    }

    return (

        <div className="container">

            <Navbar/>

            <h1>
                Transaction Simulator
            </h1>

            <form
                className="transaction-form"
                onSubmit={submitTransaction}
            >

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Merchant"
                    value={merchant}
                    onChange={(e) =>
                        setMerchant(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                />

                <button type="submit">
                    Send Transaction
                </button>

            </form>

            {result && (

                <div className="result-box">

                    <pre>
                        {JSON.stringify(
                            result,
                            null,
                            2
                        )}
                    </pre>

                </div>

            )}

        </div>

    )

}

export default Transactions