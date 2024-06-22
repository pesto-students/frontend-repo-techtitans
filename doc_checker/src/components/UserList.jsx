import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        const usersWithRoles = response.data.map(user => ({
          ...user,
          role: 'User' // Assigning a default role
        }));
        setUsers(usersWithRoles);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>User List</h1>
      <ul className="userList">
        {users.map(user => (
          <li key={user.id} className="userItem">
            {user.name} ({user.email}) - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
