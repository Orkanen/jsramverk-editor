import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import authModel from '../models/auth';
import Container from 'react-bootstrap/Container';
import "../css/listchat.css";

export default function Login({setToken, setUserEmail}) {
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
        const loginResult = await authModel.login(user);

        //console.log(loginResult);

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            setUserEmail(loginResult.data.email);
        }
    }

    return (
        <div className={"form-border"}>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email"
                            onChange={changeHandler} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password"
                            onChange={changeHandler} placeholder="Password" />
                    </Form.Group>
                    <Button className={"button-margin"} onClick={login} variant="primary">
                        Login
                    </Button>
                    <Button onClick={register} variant="primary">
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
