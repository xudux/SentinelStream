import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"





function InvestigationDetails() {

    const { id } = useParams()

    const [investigation, setInvestigation] = useState(null)

    const [status, setStatus] = useState("")
    const [notes, setNotes] = useState("")

    const [priority, setPriority] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [resolution, setResolution] = useState("")

    useEffect(() => {

        API.get(`/investigations/${id}`)
        .then(res => {
            setInvestigation(res.data)

            setStatus(res.data.status)
            setNotes(res.data.notes || "")

            setPriority(res.data.priority)
            setAssignedTo(res.data.assigned_to || "")
            setResolution(res.data.resolution || "")
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
                assigned_to: assignedTo
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
                <strong>Status:</strong>{" "}
                <span className={`investigation-status ${status}`}>
                    {status}
                </span>
            </p>

            <p>
                <strong>Priority:</strong>{" "}
                <span className={`priority-badge ${priority}`}>
                    {priority}
                </span>
            </p>

            <h3>Priority</h3>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            <h3>Assigned Analyst</h3>

            <input
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
            />

            <h3>Resolution</h3>

            <textarea
                rows="5"
                cols="50"
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
            />

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

                <h3>

                Notes

                </h3>

                <textarea

                    rows="5"

                    cols="50"

                    value={notes}

                    onChange={(e)=>

                    setNotes(

                    e.target.value

                    )

                    }

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