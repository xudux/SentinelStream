import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"

function Users() {

    const [users, setUsers] = useState([])

    const fetchUsers = () => {

        API.get("/users/all")
            .then(res => setUsers(res.data))
            .catch(console.error)

    }

    useEffect(() => {

        fetchUsers()

    }, [])

    const updateRole = (
        userId,
        role
    ) => {

        API.put(
            `/users/${userId}/role`,
            { role }
        )
        .then(() => fetchUsers())
        .catch(console.error)

    }

    const toggleStatus = (
        userId
    ) => {

        API.put(
            `/users/${userId}/toggle-status`
        )
        .then(() => fetchUsers())
        .catch(console.error)

    }

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

                        <th>Role</th>

                        <th>Status</th>

                        <th>Balance</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {users.map(user => (

                        <tr key={user.id}>

                            <td>{user.id}</td>

                            <td>{user.name}</td>

                            <td>{user.email}</td>

                            <td>

                                <select
                                    value={user.role}
                                    onChange={(e) =>
                                        updateRole(
                                            user.id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="USER">
                                        USER
                                    </option>

                                    <option value="FRAUD_ANALYST">
                                        FRAUD_ANALYST
                                    </option>

                                    <option value="ADMIN">
                                        ADMIN
                                    </option>

                                </select>

                            </td>

                            <td>

                                <span
                                    className={
                                        user.is_active
                                            ? "user-active"
                                            : "user-disabled"
                                    }
                                >
                                    {user.is_active
                                        ? "ACTIVE"
                                        : "DISABLED"}
                                </span>

                            </td>

                            <td>
                                ₹ {user.balance}
                            </td>

                            <td>

                                <button
                                    onClick={() =>
                                        toggleStatus(user.id)
                                    }
                                >
                                    {user.is_active
                                        ? "Disable"
                                        : "Enable"}
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default Users