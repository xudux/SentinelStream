import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import API from "../api/api"

import Navbar from "../components/Navbar"





function InvestigationDetails() {

    const { id } = useParams()

    const [investigation, setInvestigation] = useState(null)

    const [status, setStatus] = useState("")
    const [notes, setNotes] = useState("")

    useEffect(() => {

        API.get(`/investigations/${id}`)

        .then(res => {

            setInvestigation(res.data)

            setStatus(res.data.status)

            setNotes(res.data.notes || "")

        })

        .catch(console.error)

    }, [id])



    if (!investigation) {

        return <h2>Loading...</h2>

    }

    const updateCase = () => {

        API.put(

            `/investigations/${id}`,

            {

            status,

            notes,

            priority,

            resolution,

            assigned_to

            }

        )

        .then(res => {

            setInvestigation(res.data)

            alert("Case updated")

        })

        .catch(console.error)

    }

    return (

        <div className="container">

            <Navbar />

            <h1>

                Investigation #{investigation.id}

            </h1>

            <p>

                <strong>Fraud Event:</strong>

                {" "}

                {investigation.fraud_event_id}

            </p>

            <p>

                <strong>Status:</strong>

                {" "}

                {investigation.status}

            </p>

            <p>

                <strong>Assigned To:</strong>

                {" "}

                {investigation.assigned_to}

            </p>

            <p>

                <strong>Priority:</strong>

                {" "}

                {investigation.priority}

            </p>

            <p>

                <strong>Notes:</strong>

                {" "}

                {investigation.notes || "-"}

            </p>

            <p>

                <strong>Resolution:</strong>

                {" "}

                {investigation.resolution || "-"}

            </p>

            <hr />

                <h3>Update Investigation</h3>

                <select

                    value={status}

                    onChange={(e) => setStatus(e.target.value)}

                >

                    <option value="OPEN">
                        OPEN
                    </option>

                    <option value="UNDER_REVIEW">
                        UNDER REVIEW
                    </option>

                    <option value="CLOSED">
                        CLOSED
                    </option>

                </select>

                <br />
                <br />

                <textarea

                    rows="5"

                    cols="50"

                    value={notes}

                    onChange={(e) => setNotes(e.target.value)}

                />

                <br />
                <br />

                <button onClick={updateCase}>

                    Save Changes

                </button>

        </div>

    )

}

export default InvestigationDetails