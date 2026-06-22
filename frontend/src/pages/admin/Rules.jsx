import { useEffect, useState } from "react"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"


function Rules() {


    const [rules, setRules] = useState([])


    const [form, setForm] = useState({

        name: "",

        rule_type: "",

        rule_value: "",

        risk_score: ""

    })



    useEffect(() => {

        fetchRules()

    }, [])



    const fetchRules = () => {

        API.get("/rules")

        .then(

            res => setRules(res.data)

        )

        .catch(console.error)

    }

    const toggleRule = (

        id

    ) => {

        API.put(

            `/rules/${id}/toggle`

        )

        .then(() => {

            fetchRules()

        })

        .catch(

            console.error

        )

    }

    const deleteRule = (

        id

    ) => {

        if (

            !window.confirm(

                "Delete this rule?"

            )

        ) {

            return

        }

        API.delete(

            `/rules/${id}`

        )

        .then(() => {

            fetchRules()

        })

        .catch(

            console.error

        )

    }

    const createRule = () => {

        console.log(form)

        API.post(
            "/rules/",
            {
                name: form.name,

                rule_type: form.rule_type,

                rule_value: form.rule_value,

                risk_score: Number(form.risk_score)
            }
        )

        .then((res) => {

            console.log(res.data)

            fetchRules()

            setForm({

                name:"",

                rule_type:"",

                rule_value:"",

                risk_score:""

            })

        })

        .catch(err => {

            console.log(err.response)

        })

    }

    return (

        <div className="container">

            <Navbar />



            <h1>

                Fraud Rules

            </h1>



            <div className="rule-form">

                <input
                    placeholder="Rule Name"
                    value={form.name}
                    onChange={e =>
                        setForm({
                            ...form,
                            name: e.target.value
                        })
                    }
                />

                <select
                    value={form.rule_type}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            rule_type: e.target.value,
                        })
                    }
                >
                    <option value="">
                        Select Rule Type
                    </option>

                    <option value="COUNTRY">
                        COUNTRY
                    </option>

                    <option value="MERCHANT">
                        MERCHANT
                    </option>

                    <option value="AMOUNT">
                        AMOUNT
                    </option>
                </select>

                {
                    form.rule_type === "COUNTRY" ? (
                        <select
                            value={form.rule_value}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rule_value: e.target.value,
                                })
                            }
                        >
                            <option value="">
                                Select Country
                            </option>

                            <option value="Russia">
                                Russia
                            </option>

                            <option value="Nigeria">
                                Nigeria
                            </option>

                            <option value="North Korea">
                                North Korea
                            </option>
                        </select>
                    ) : form.rule_type === "MERCHANT" ? (
                        <select
                            value={form.rule_value}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rule_value: e.target.value,
                                })
                            }
                        >
                            <option value="">
                                Select Merchant
                            </option>

                            <option value="CryptoExchange">
                                CryptoExchange
                            </option>

                            <option value="DarkWebMarket">
                                DarkWebMarket
                            </option>

                            <option value="UnknownVendor">
                                UnknownVendor
                            </option>
                        </select>
                    ) : (
                        <input
                            placeholder="Amount Threshold"
                            value={form.rule_value}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    rule_value: e.target.value,
                                })
                            }
                        />
                    )
                }

                <input
                    placeholder="Risk Score"
                    value={form.risk_score}
                    onChange={e =>
                        setForm({
                            ...form,
                            risk_score: e.target.value
                        })
                    }
                />

                <button onClick={createRule}>
                    Create Rule
                </button>

            </div>



            <table>

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

                    {

                        rules.map(rule => (

                            <tr key={rule.id}>


                                <td>

                                    {rule.id}

                                </td>



                                <td>

                                    {rule.name}

                                </td>



                                <td>

                                    {rule.rule_type}

                                </td>



                                <td>

                                    {rule.rule_value}

                                </td>



                                <td>

                                    {rule.risk_score}

                                </td>



                                <td>
                                    {rule.is_active ? "Active" : "Disabled"}
                                </td>

                                <td>

                                <button

                                onClick={() => toggleRule(rule.id)}

                                >

                                {rule.is_active ? "Disable" : "Enable"}

                                </button>


                                <button

                                style={{

                                marginLeft:"10px"

                                }}

                                onClick={() => deleteRule(rule.id)}

                                >

                                Delete

                                </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}


export default Rules