import { useEffect, useState } from "react"
import API from "../api/api"
import Navbar from "../components/Navbar"

function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {

        API.get("/users/all")
            .then(res => setUsers(res.data))
            .catch(console.error)

    }, [])

    return (

        <div className="container">

            <Navbar />

            <h1>
                User Management
            </h1>

            <table>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Balance</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>{user.id}</td>

                            <td>{user.name}</td>

                            <td>{user.email}</td>

                            <td>{user.balance}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default Users