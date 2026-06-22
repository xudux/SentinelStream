import { useEffect, useState } from "react"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"

import { Link } from "react-router-dom"

function Investigations() {

    const [cases,setCases] = useState([])


    useEffect(() => {

        API.get("/investigations/")

        .then(res => setCases(res.data))

        .catch(console.error)

    },[])



    return (

        <div className="container">

            <Navbar />

            <h1>

                Fraud Investigation Cases

            </h1>


            <table className="analyst-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Fraud Event</th>

                        <th>Status</th>

                        <th>Assigned To</th>

                        <th>Priority</th>

                    </tr>

                </thead>



                <tbody>

                    {

                        cases.map(c => (

                            <tr key={c.id}>

                                <td>

                                    <Link to={`/analyst/investigations/${c.id}`} >
                                        {c.id}

                                    </Link>

                                </td>


                                <td>

                                    {c.fraud_event_id}

                                </td>


                                <td>

                                    <span

                                        className={`investigation-status ${c.status}`}

                                    >

                                        {c.status}

                                    </span>

                                </td>


                                <td>

                                    {c.assigned_to}

                                </td>


                                <td>

                                    <span

                                        className={`priority-badge ${c.priority}`}

                                    >

                                        {c.priority}

                                    </span>

                                </td>
                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}


export default Investigations