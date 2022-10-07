import Container from 'react-bootstrap/Container';
import React, { useEffect, useState } from 'react';
import adminModel from '../models/admin';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import "../css/listchat.css";

export default function Admin({email, token}) {
    const [search, setNewSearch] = useState('');
    const [newResult, setNewResult] = useState(null);
    const [newList, setNewList] = useState(null);

    async function getItems(token, query) {
        setNewResult(await adminModel.getAdminUsers(token, query));
    }

    useEffect(() => {
        if (newResult) {
            setNewList(newResult.users);
        }
    }, [newResult]);

    function List(props) {
        if (props.data) {
            //console.log(props.data);
            const sidebar = (
                <ListGroup>
                    {props.data?.map((user, i) =>
                        <ListGroup.Item key={i}>
                            {user.username ? user.username+", ": ''}
                            {user.email ? user.email+", ": ''}
                            {user.fname ? user.fname+", ": ''}
                            {user.lname ? user.lname+", ": ''}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            );

            return (
                <div>{sidebar}</div>
            );
        }
    }

    return (
        <div className={"form-border"}>
            <Container>
                {email}
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Something.."
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setNewSearch(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon2">User</InputGroup.Text>
                    <Button style={{float: 'right'}} variant="info"
                        onClick={() => getItems({token}, search)}>Search</Button>{' '}
                </InputGroup>
                <List data={newList}/>
            </Container>
        </div>
    );
}
