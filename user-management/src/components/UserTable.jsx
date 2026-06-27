function UserTable({

    users,

    setEditingUser,

    deleteUser

}) {

    if (users.length === 0) {

        return <h3 style={{ textAlign: "center" }}>No Users Found</h3>;

    }

    return (

        <div className="table-container">

            <table>

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>

                                    {user.status ? "Active" : "Inactive"}

                                </td>

                                <td>

                                    <button

                                        className="edit-btn"

                                        onClick={() => setEditingUser(user)}

                                    >

                                        Edit

                                    </button>

                                    <button

                                        className="delete-btn"

                                        onClick={() => deleteUser(user.id)}

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

    );

}

export default UserTable;