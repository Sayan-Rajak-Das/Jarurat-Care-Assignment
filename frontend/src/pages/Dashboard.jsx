import React, { useEffect, useState } from "react";
import { useCrudStore } from "../store/useCrudStore";
import { useAuthStore } from "../store/useAuthStore";
import { Button, Table, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const { users, fetchAllUsers, createUser, updateUser, deleteUser } = useCrudStore();
  const { authUser } = useAuthStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    fetchAllUsers();
  }, [authUser]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCreate = async () => {
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }
    try {
      await createUser(formData);
      setFormData({ fullName: "", email: "", password: "", role: "user" });
      setShowCreateModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating user.");
    }
  };

  const handleUpdate = async () => {
    if (!validateEmail(formData.email)) {
      toast.error("Invalid email format.");
      return;
    }
    try {
      await updateUser(selectedUser._id, formData);
      setFormData({ fullName: "", email: "", password: "", role: "user" });
      setShowEditModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating user.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting user.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
      </div>

      {authUser?.role === "admin" && (
        <Button className="mb-3" onClick={() => setShowCreateModal(true)}>
          Create New User
        </Button>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            {authUser?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {authUser?.role === "admin" && (
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      setSelectedUser(user);
                      setFormData({
                        fullName: user.fullName,
                        email: user.email,
                        password: "",
                        role: user.role,
                      });
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dashboard;
