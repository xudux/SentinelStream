import { useEffect, useState } from "react"

import API from "../../api/api"

import Navbar from "../../components/common/Navbar"

import StatsCard from "../../components/common/StatsCard";

import {

    PageHeader,

    Button,

    Badge,

    EmptyState,

    ErrorState,

    Card,

    Input,

    Select,

    CardSkeleton,

    Modal

} from "../../components/ui";



function Users() {



    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("ALL");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [error, setError] = useState("");

    const [confirmUser, setConfirmUser] = useState(null);

    const [statusUpdating, setStatusUpdating] = useState(false);

    const [roleConfirmUser, setRoleConfirmUser] = useState(null);
    const [pendingRole, setPendingRole] = useState("");
    const [roleUpdating, setRoleUpdating] = useState(false);



    const fetchUsers = () => {

        setLoading(true);

        API.get("/users/all")

            .then(res => {

                setUsers(

                    [...res.data].sort(

                        (a, b) => b.id - a.id

                    )

                );

                setError("");

            })

            .catch(() => {

                setError("Unable to load users.");

            })

            .finally(() => {

                setLoading(false);

            });

    };



    useEffect(() => {

        fetchUsers()

    }, [])



    const updateRole = (userId, role) => {

        setError("");

        API.put(`/users/${userId}/role`, { role })

            .then(() => fetchUsers())

            .catch(() => {

                setError("Unable to update user role.");

            });

    };



    const toggleStatus = (userId) => {
        setError("");
        setStatusUpdating(true);

        API.put(`/users/${userId}/toggle-status`)
            .then(() => {
                setConfirmUser(null);
                fetchUsers();
            })
            .catch(() => {
                setError("Unable to update user status.");
            })
            .finally(() => {
                setStatusUpdating(false);
            });
    };



    const filteredUsers = users.filter((user) => {



        const query = search.toLowerCase();



        const matchesSearch =

            (user.name || "").toLowerCase().includes(query)

            ||

            (user.email || "").toLowerCase().includes(query)

            ||

            (user.role || "").toLowerCase().includes(query);



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



    if (loading) {

        return (

            <div className="container">

                <Navbar />

                <PageHeader

                    title="User Management"

                    subtitle="Manage platform users, roles and account status"

                />



                <div className="analyst-cards-grid">

                    <CardSkeleton />

                    <CardSkeleton />

                    <CardSkeleton />

                </div>



                <br />



                <CardSkeleton />

            </div>

        );

    }



    if (error) {

        return (

            <div className="container">

                <Navbar />

                <ErrorState

                    title="Failed to load users"

                    description={error}

                    onRetry={fetchUsers}

                />

            </div>

        );

    }



    return (

        <div className="container">

            <Navbar />



            <PageHeader

                title="User Management"

                subtitle="Manage platform users, roles and account status"

                actions={

                    <Button

                        variant="secondary"

                        onClick={fetchUsers}

                    >

                        Refresh

                    </Button>

                }

            />

            <div className="analyst-cards-grid">

                <StatsCard title="Total Users" value={users.length} />

                <StatsCard

                    title="Active"

                    value={users.filter(u => u.is_active).length}

                />

                <StatsCard

                    title="Disabled"

                    value={users.filter(u => !u.is_active).length}

                />

            </div>


            <Card

                title="Filters"

                subtitle="Search and filter platform users"

            >

                <div className="table-toolbar">



                    <Input

                        label="Search"

                        placeholder="Search users..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />



                    <Select

                        label="Role"

                        value={roleFilter}

                        onChange={(e) => setRoleFilter(e.target.value)}

                    >

                        <option value="ALL">All Roles</option>

                        <option value="USER">User</option>

                        <option value="FRAUD_ANALYST">Fraud Analyst</option>

                        <option value="ADMIN">Admin</option>

                    </Select>



                    <Select

                        label="Status"

                        value={statusFilter}

                        onChange={(e) => setStatusFilter(e.target.value)}

                    >

                        <option value="ALL">All Status</option>

                        <option value="ACTIVE">Active</option>

                        <option value="DISABLED">Disabled</option>

                    </Select>



                </div>

            </Card>            


            <Card

                title="Platform Users"

                subtitle="Manage user accounts, roles, and account status"

            >

                {filteredUsers.length === 0 ? (

                    <EmptyState

                        title="No users found"

                        description="Try changing your search or filter."

                    />

                ) : (

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

                                        <Select
                                            value={user.role}
                                            onChange={(e) => {
                                                if (roleUpdating) return;

                                                if (roleConfirmUser?.id === user.id) {
                                                    setPendingRole(e.target.value);
                                                    return;
                                                }

                                                setRoleConfirmUser(user);
                                                setPendingRole(e.target.value);
                                            }}
                                            disabled={roleUpdating || roleConfirmUser?.id === user.id}
                                        >
                                            <option value="USER">USER</option>
                                            <option value="FRAUD_ANALYST">FRAUD_ANALYST</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </Select>

                                    </td>

                                    <td>

                                        <Badge variant={user.is_active ? "success" : "danger"}>

                                            {user.is_active ? "ACTIVE" : "DISABLED"}

                                        </Badge>

                                    </td>

                                    <td>

                                        ₹ {Number(user.balance).toLocaleString("en-IN")}

                                    </td>

                                    <td>

                                        <div className="table-actions">

                                            <Button
                                                variant={user.is_active ? "danger" : "primary"}
                                                size="sm"
                                                onClick={() => setConfirmUser(user)}
                                            >
                                                {user.is_active ? "Disable" : "Enable"}
                                            </Button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </Card>

            <Modal
                open={!!confirmUser}
                onClose={() => {
                    setConfirmUser(null);
                    setStatusUpdating(false);
                }}
                title={confirmUser?.is_active ? "Disable account?" : "Enable account?"}
                size="sm"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => setConfirmUser(null)}
                            disabled={statusUpdating}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant={confirmUser?.is_active ? "danger" : "primary"}
                            disabled={statusUpdating}
                            onClick={() => toggleStatus(confirmUser.id)}
                        >
                            {statusUpdating
                                ? "Updating..."
                                : confirmUser?.is_active
                                    ? "Disable"
                                    : "Enable"}
                        </Button>
                    </>
                }
            >
                <p>
                    {confirmUser?.is_active
                        ? "User will no longer be able to login."
                        : "User will be able to login again."}
                </p>
            </Modal>

            <Modal
                open={!!roleConfirmUser}
                onClose={() => {
                    if (roleUpdating) return;

                    setRoleConfirmUser(null);
                    setPendingRole("");
                }}
                title="Change role?"
                size="sm"
                footer={
                    <>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setRoleConfirmUser(null);
                                setPendingRole("");
                            }}
                            disabled={roleUpdating}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant="primary"
                            disabled={roleUpdating}
                            onClick={() => {
                                if (roleUpdating || !roleConfirmUser) return;
                                setRoleUpdating(true);

                                API.put(
                                    `/users/${roleConfirmUser.id}/role`,
                                    { role: pendingRole }
                                )
                                    .then(() => {
                                        setRoleConfirmUser(null);
                                        setPendingRole("");
                                        fetchUsers();
                                    })
                                    .catch(() => {
                                        setError("Unable to update user role.");
                                    })
                                    .finally(() => {
                                        setRoleUpdating(false);
                                    });
                            }}
                        >
                            {roleUpdating ? "Updating..." : "Confirm"}
                        </Button>
                    </>
                }
            >
                <p>
                    Change role from{" "}
                    <b>{roleConfirmUser?.role}</b>{" "}
                    to{" "}
                    <b>{pendingRole}</b>?
                </p>
            </Modal>

        </div>

    )

}



export default Users