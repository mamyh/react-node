import React, { useRef } from 'react';

const AddUser = () => {
    //const [users, setUsers] = useState([])
    const nameRef = useRef();
    const emailRef = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const newUser = { name, email };
        const useString = JSON.stringify(newUser);
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: { "content-type": 'application/json' },
            body: useString,
        }).then(res => res.json()).then(data => {
            if (data.insertedId) {
                alert('user Added successfully');
                e.target.reset();
            }
        });

        // nameRef.current.value = '';
        // emailRef.current.value = '';

    }
    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" ref={nameRef} />
                <input type="email" name="email" id="email" ref={emailRef} />
                <input type="submit" value="Add" />
            </form>
            <ul>

            </ul>
        </div>
    );
};

export default AddUser;