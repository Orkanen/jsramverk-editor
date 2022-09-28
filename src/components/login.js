import { useState } from 'react';

import authModel from '../models/auth';


export default function Login({setToken}) {
    const [user, setUser] = useState({});

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    }

    async function register() {
        await authModel.register(user);
    }

    async function login() {
        //console.log(user);
        const loginResult = await authModel.login(user);

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
        }
    }

    return (
        <>
            <h2>Login eller registrera</h2>
            <input type="email" name="email" onChange={changeHandler} />
            <input type="password" name="password" onChange={changeHandler} />

            <button onClick={register}>Registrera</button>
            <button onClick={login}>Logga in</button>
        </>
    );
}
