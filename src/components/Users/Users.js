import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users').then(res => res.json()).then(data => setUsers(data));
    }, []);
    //delete an user 
    const handleDeleteUser = id => {
        const procced = window.confirm('Are you sure to continue to delete');
        if (procced) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: 'DELETE',
            }).then(res => res.json()).then(data => {
                if (data.deletedCount === 1) {
                    alert('deleted successfull');
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                }
            });
        }
    }


    return (
        <div>
            <h2>we have {users.length} users</h2>
            <ul>
                {users.map(user => <li key={Math.random()}>
                    <h1>{user.name}::{user.email}</h1>

                    <div>
                        <Link to={`/users/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        {/* <button onClick={() => handleUpdateUser(user._id)}>Update</button> */}
                        <button onClick={() => handleDeleteUser(user._id)}>X</button>
                    </div>
                </li>)}
            </ul>
        </div>
    );
};

export default Users;