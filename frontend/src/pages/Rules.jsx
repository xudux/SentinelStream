import { useEffect, useState } from "react"

import API from "../api/api"

import Navbar from "../components/Navbar"


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



    const createRule = () => {

        API.post(

            "/rules",

            form

        )

        .then(() => {

            fetchRules()

            setForm({

                name:"",

                rule_type:"",

                rule_value:"",

                risk_score:""

            })

        })

        .catch(console.error)

    }



    return (

        <div className="container">

            <Navbar />



            <h1>

                Fraud Rules

            </h1>



            <div className="form">



                <input

                    placeholder="Rule Name"

                    value={form.name}

                    onChange={e=>

                        setForm({

                            ...form,

                            name:e.target.value

                        })

                    }

                />



                <input

                    placeholder="Rule Type"

                    value={form.rule_type}

                    onChange={e=>

                        setForm({

                            ...form,

                            rule_type:e.target.value

                        })

                    }

                />



                <input

                    placeholder="Rule Value"

                    value={form.rule_value}

                    onChange={e=>

                        setForm({

                            ...form,

                            rule_value:e.target.value

                        })

                    }

                />



                <input

                    placeholder="Risk Score"

                    value={form.risk_score}

                    onChange={e=>

                        setForm({

                            ...form,

                            risk_score:e.target.value

                        })

                    }

                />



                <button

                    onClick={createRule}

                >

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

                                    {

                                        rule.is_active

                                        ?

                                        "Active"

                                        :

                                        "Disabled"

                                    }

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