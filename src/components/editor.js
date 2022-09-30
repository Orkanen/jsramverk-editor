import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import editorModel from '../models/editor';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Editor({lists, submitFunction, socket, email}) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [room, setRoom] = useState('');
    const [newUser, setNewUser] = useState('');
    const items = lists;

    async function saveList(text, title, email) {
        await editorModel.saveList(title, text, email);

        submitFunction();
    }

    async function updateList(text, title) {
        await editorModel.updateList(title, text);

        submitFunction();
    }

    function List(props) {
        const sidebar = (
            <DropdownButton id="dropdown-basic-button" title="Documents">
                <Dropdown.Menu>
                    {props.data?.map((post, i) =>
                        <Dropdown.Item key={i}
                            onClick={() => (joinRoom(post._id),
                            fetchItem({i}))}>{post._id},
                            {post.docTitle}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </DropdownButton>
        );

        return (
            <div>{sidebar}</div>
        );
    }

    async function fetchItem(number) {
        setTitle(items[{number}.number.i]._id);
        setValue(items[{number}.number.i].docText);
    }

    function onChangeEffect(e) {
        //console.log(e);
        let dataEmit = {
            _id: {title},
            html: e
        };

        //console.log(dataEmit);
        if (socket) {
            socket.emit("document", dataEmit);
        }
        setValue(e);
    }

    useEffect(() => {
        socket.on("document", (data) => {
            setValue(data["html"]);
        });
    }, [title]);

    function joinRoom(e) {
        socket.emit("leave", room);
        if (socket) {
            socket.emit("editor", e);
            setRoom(e);
        } else {
            console.log("socket error");
        }
    }

    async function addUser(id, value) {
        if (value && id) {
            console.log(id, " + ", value);
            await editorModel.addOwner(id, value);

            submitFunction();
        }
    }

    return (
        <Container>
            <h3>
                {email}
                <br/>
                {title}
            </h3>
            <ReactQuill id="quillEditor" theme="snow"
                value={value} onChange={(e) => onChangeEffect(e)}
                style={{ whiteSpace: 'pre-wrap' }}
            />
            <Row>
                <Col sm={4}>
                    <List data={lists}/>
                </Col>
                <Col sm={8}>
                    <Button style={{float: 'right'}} variant="secondary"
                        onClick={() => updateList(value, title)}>Update</Button>{' '}
                    <Button style={{float: 'right'}} variant="success"
                        onClick={() => saveList(value, title, email)}>Create</Button>{' '}
                </Col>
            </Row>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
            </InputGroup>
            <Button style={{float: 'right'}} variant="info"
                onClick={() => addUser(title, newUser)}>Add User</Button>{' '}
        </Container>
    );
}
