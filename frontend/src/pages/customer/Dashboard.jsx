import { useEffect, useState } from "react";

import API from "../../api/api";

import Navbar from "../../components/common/Navbar";

function Dashboard() {

    const [profile, setProfile] = useState(null);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {

        API.get("/users/profile")

        .then(res => {

            setProfile(res.data);

        })

        .catch(console.error);


        API.get("/transactions/history")

        .then(res => {

            setTransactions(res.data);

        })

        .catch(console.error);

    }, []);



    if (!profile) {

        return (

            <div>

                Loading...

            </div>

        )

    }


    return (

        <div className="customer-dashboard">

            <Navbar />

            <h1>

                Customer Dashboard

            </h1>

            <div className="customer-stats">

                <div className="customer-card">

                    <h3>

                        Balance

                    </h3>

                    <p>

                        ₹ {profile.balance}

                    </p>

                </div>

                <div className="customer-card">

                    <h3>

                        Email

                    </h3>

                    <p>

                        {profile.email}

                    </p>

                </div>

                <div className="customer-card">

                    <h3>

                        Transactions

                    </h3>

                    <p>

                        {transactions.length}

                    </p>

                </div>

            </div>

            <h2>

                Recent Transactions

            </h2>

            <table className="customer-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Amount</th>

                        <th>Merchant</th>

                        <th>Location</th>

                        <th>Status</th>

                        <th>Risk</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        transactions.map(tx => (

                            <tr key={tx.id}>

                                <td>

                                    {tx.id}

                                </td>

                                <td>

                                    ₹ {tx.amount}

                                </td>

                                <td>

                                    {tx.merchant}

                                </td>

                                <td>

                                    {tx.location}

                                </td>

                                <td>

                                    {tx.status}

                                </td>

                                <td>

                                    {tx.risk_score}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}

export default Dashboard;