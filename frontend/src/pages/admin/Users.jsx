import { useEffect, useState } from "react"
import API from "../../api/api"
import Navbar from "../../components/common/Navbar"
import { PageHeader } from "../../components/ui";
import StatsCard from "../../components/common/StatsCard";
import { Button } from "../../components/ui";
import { Badge } from "../../components/ui";

function Users() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("ALL");

    const [statusFilter, setStatusFilter] = useState("ALL");

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

    const filteredUsers = users.filter((user) => {

        const query = search.toLowerCase();

        const matchesSearch =

            user.name.toLowerCase().includes(query)

            ||

            user.email.toLowerCase().includes(query)

            ||

            user.role.toLowerCase().includes(query);

        const matchesRole =

            roleFilter === "ALL"

            ||

            user.role === roleFilter;

        const matchesStatus =

            statusFilter === "ALL"

            ||

            (statusFilter === "ACTIVE" && user.is_active)

            ||

            (statusFilter === "DISABLED" && !user.is_active);

        return (

            matchesSearch

            &&

            matchesRole

            &&

            matchesStatus

        );

    });

    return (

        <div className="container">

            <Navbar />

            <PageHeader
                title="User Management"
                subtitle="Manage platform users, roles and account status"
            />

            <div className="table-toolbar">

                <input

                    className="ui-input"

                    type="text"

                    placeholder="Search users..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

                <select

                    className="ui-select"

                    value={roleFilter}

                    onChange={(e)=>setRoleFilter(e.target.value)}

                >

                    <option value="ALL">All Roles</option>

                    <option value="USER">User</option>

                    <option value="FRAUD_ANALYST">Fraud Analyst</option>

                    <option value="ADMIN">Admin</option>

                </select>

                <select

                    className="ui-select"

                    value={statusFilter}

                    onChange={(e)=>setStatusFilter(e.target.value)}

                >

                    <option value="ALL">All Status</option>

                    <option value="ACTIVE">Active</option>

                    <option value="DISABLED">Disabled</option>

                </select>

            </div>

            <div className="analyst-cards-grid">

                <StatsCard
                    title="Total Users"
                    value={users.length}
                />

                <StatsCard
                    title="Active"
                    value={
                        users.filter(
                            u => u.is_active
                        ).length
                    }
                />

                <StatsCard
                    title="Disabled"
                    value={
                        users.filter(
                            u => !u.is_active
                        ).length
                    }
                />

            </div>

            <div className="table-container">

                <table className="ui-table">

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

                        {filteredUsers.map(user => (

                            <tr key={user.id}>

                                <td>{user.id}</td>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>

                                    <select
                                        className="ui-select"
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

                                    <Badge
                                        variant={
                                            user.is_active
                                                ? "success"
                                                : "danger"
                                        }
                                    >
                                        {user.is_active
                                            ? "ACTIVE"
                                            : "DISABLED"}
                                    </Badge>

                                </td>

                                <td>
                                    ₹ {Number(user.balance).toLocaleString("en-IN")}
                                </td>

                                <td>

                                    <Button
                                        variant={
                                            user.is_active
                                                ? "danger"
                                                : "primary"
                                        }
                                        size="sm"
                                        onClick={() =>
                                            toggleStatus(user.id)
                                        }
                                    >
                                        {user.is_active
                                            ? "Disable"
                                            : "Enable"}
                                    </Button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default Users