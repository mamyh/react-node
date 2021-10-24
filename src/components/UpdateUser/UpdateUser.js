import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({ name: '', email: '' })
    const { id } = useParams();
    useEffect(() => {
        const url = `http://localhost:5000/users/${id}`;
        fetch(url).then(res => res.json()).then(data => setUser(data));
    }, []);
    const handleName = (e) => {
        const updatedName = e.target.value;
        const updatedUser = { ...user };
        updatedUser.name = updatedName;

        setUser(updatedUser);
    }
    const handleEmail = (e) => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...user };
        updatedUser.email = updatedEmail;

        setUser(updatedUser);
    }
    const handleUpdateUser = (e) => {

        const url = `http://localhost:5000/users/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => console.log(data));
        e.preventDefault();
    }
    return (
        <div>
            <h2>The Details of {user.name}</h2>
            <h3>Your Email is {user.email}</h3>
            <form onSubmit={handleUpdateUser}>
                <input type="text" onChange={handleName} value={user.name || ''} />
                <input type="email" onChange={handleEmail} value={user.email || ''} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateUser;