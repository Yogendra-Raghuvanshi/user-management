import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import Loader from "./components/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load users from Local Storage
  useEffect(() => {

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setUsers(storedUsers);

    setLoading(false);

  }, []);

  // Save users whenever they change
  useEffect(() => {

    localStorage.setItem("users", JSON.stringify(users));

  }, [users]);

  // Add new user
  const addUser = (user) => {

    setUsers([...users, user]);

    toast.success("User Added Successfully");

  };

  // Update user
  const updateUser = (updatedUser) => {

    const updatedList = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );

    setUsers(updatedList);

    setEditingUser(null);

    toast.success("User Updated Successfully");

  };

  // Delete user
  const deleteUser = (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {

      const updatedList = users.filter((user) => user.id !== id);

      setUsers(updatedList);

      toast.success("User Deleted");

    }

  };

  // Search User
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container">

      <h1>User Management</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search User..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <UserForm
        addUser={addUser}
        editingUser={editingUser}
        updateUser={updateUser}
      />

      {
        loading ?

          <Loader />

          :

          <UserTable
            users={filteredUsers}
            setEditingUser={setEditingUser}
            deleteUser={deleteUser}
          />

      }

      <ToastContainer position="top-right" autoClose={2000} />

    </div>

  );

}

export default App;