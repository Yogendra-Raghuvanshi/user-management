import { useState, useEffect } from "react";

function UserForm({ addUser, editingUser, updateUser }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {

    if (editingUser) {

      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setStatus(editingUser.status);

    }

  }, [editingUser]);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill all fields.");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    const user = {

      id: editingUser ? editingUser.id : Date.now(),

      name,
      email,
      role,
      status

    };

    if (editingUser) {
      updateUser(user);
    } else {
      addUser(user);
    }

    setName("");
    setEmail("");
    setRole("");
    setStatus(false);

  };

  return (

    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >

        <option value="">Select Role</option>

        <option>Admin</option>

        <option>User</option>

        <option>Manager</option>

      </select>

      <label>

        <input
          type="checkbox"
          checked={status}
          onChange={() => setStatus(!status)}
        />

        Active

      </label>

      <button>

        {editingUser ? "Update User" : "Add User"}

      </button>

    </form>

  );

}

export default UserForm;