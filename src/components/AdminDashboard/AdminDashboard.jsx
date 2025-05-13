import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import UserChart from '../UserChart/UserChart';
import SignUp from '../SignUp/SignUp';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [groupedUsers, setGroupedUsers] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [courses, setCourses] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const today = new Date().toISOString().split('T')[0];


    useEffect(() => {
        fetchUsers();
        fetchCourses();
        fetchContacts();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/user-data')
            .then(response => {
                const allUsers = response.data;
                setUsers(allUsers);
                const grouped = allUsers.reduce((acc, user) => {
                    acc[user.role] = acc[user.role] ? [...acc[user.role], user] : [user];
                    return acc;
                }, {});
                setGroupedUsers(grouped);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const fetchCourses = () => {
        axios.get('http://localhost:5000/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    };

    const fetchContacts = () => {
        axios.get('http://localhost:5000/user-contact')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));
    };

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setUserToDelete(null);
        setShowDeleteModal(false);
    };

    const confirmDeleteUser = () => {
        axios.delete(`http://localhost:5000/user-data/${userToDelete.id}`)
            .then(() => {
                toast.success('User deleted successfully!');
                fetchUsers();
                closeDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                toast.error('Error deleting user.');
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser(prev => ({ ...prev, [name]: value }));
    };

    const updateUser = () => {
        axios.put(`http://localhost:5000/user-data/${selectedUser.id}`, selectedUser)
            .then(() => {
                toast.success('User updated successfully!');
                setSelectedUser(null);
                fetchUsers();
            })
            .catch(error => {
                console.error('Error updating user:', error);
                toast.error('Error updating user.');
            });
    };

    const studentCount = groupedUsers['student']?.length || 0;
    const courseCount = courses.length;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Admin Dashboard</h2>

            {/* Charts Section */}
            <UserChart groupedUsers={groupedUsers}/>

            {/* Add User */}
            <SignUp title="Add User Details" buttonText="Add User" onUserAdded={fetchUsers} />

            {/* User List */}
            <div className="row">
                {users.map(user => (
                    <div className="col-md-4 mb-4" key={user.id}>
                        <div className="card shadow p-3">
                            <h5>{user.name}</h5>
                            <p>Email: {user.email}</p>
                            <p>DOB: {user.dob}</p>
                            <p>Role: {user.role}</p>
                            <div>
                                <button className="btn btn-primary me-2" onClick={() => setSelectedUser(user)}>Edit</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => openDeleteModal(user)}
                                    disabled={user.role === 'admin'}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Form */}
            {selectedUser && (
                <div className="card p-4 mt-4 shadow">
                    <h4>Edit User</h4>
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <input className="form-control" name="name" value={selectedUser.name} onChange={handleInputChange} placeholder="Full Name" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <input className="form-control" name="email" value={selectedUser.email} onChange={handleInputChange} placeholder="Email" />
                        </div>
                        <div className="col-md-3 mb-3">
                            <input type="date" className="form-control" name="dob" value={selectedUser.dob} max={today} onChange={handleInputChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <select className="form-control" name="role" value={selectedUser.role} onChange={handleInputChange}>
                                <option value="admin">Admin</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={updateUser}>Update</button>
                </div>
            )}

            {/* Contact Section */}
            <div className="card p-4 mt-5 mb-4 shadow">
                <h4>User Contact Messages</h4>
                <ul className="list-group">
                    {contacts.map(contact => (
                        <li key={contact.id} className="list-group-item">
                            <strong>{contact.name}</strong> ({contact.email}): {contact.message}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete <strong>{userToDelete?.name}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
                                <button className="btn btn-danger" onClick={confirmDeleteUser}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
