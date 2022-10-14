import React, { useEffect, useRef, useState } from 'react';
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
import PopUp from "./popUp";
import "../css/listchat.css";

export default function Editor({lists, submitFunction, socket, email}) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [room, setRoom] = useState('');
    const [newUser, setNewUser] = useState('');
    const [newTitle, setNewTitle] = useState('');
    //const [newDelta, setNewDelta] = useState('');
    const items = lists;
    const quill = useRef();

    async function saveList(text, id, email, title) {
        await editorModel.saveList(id, text, email, title);

        submitFunction();
    }

    async function updateList(text, id, title) {
        await editorModel.updateList(id, text, title);

        submitFunction();
    }

    function List(props) {
        //console.log(props);
        const sidebar = (
            <DropdownButton id="dropdown-basic-button" title="Documents">
                <Dropdown.Menu>
                    {props.data?.map((post, i) =>
                        <Dropdown.Item key={i}
                            onClick={() => (joinRoom(post._id),
                            fetchItem({i}))}>{/*post._id*/}
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
        setNewTitle(items[{number}.number.i].docTitle);
    }
    /* eslint-disable */
    function onChangeEffect(e, delta, source, editor) {
        //console.log(e, editor.getContents());
        let dataEmit = {
            _id: {title},
            html: e
        };

        //console.log(dataEmit);
        if (socket) {
            socket.emit("document", dataEmit);
        }
        setValue(e);
        //setNewDelta(editor.getContents());
    }
    /* eslint-enable */
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
                {/*title*/}
            </h3>
            <div className={"form-border"}>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                    <Form.Control
                        placeholder={value ?
                            (value.split(">")[1]).split("<")[0]  : "Add Title"}
                        aria-label="title"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                    />
                </InputGroup>
                <ReactQuill id="quillEditor" theme="snow"
                    value={value} onChange={(html, delta, source, editor) =>
                        onChangeEffect(html, delta, source, editor)}
                    style={{ whiteSpace: 'pre-wrap' }}
                    ref={quill}
                />
                <br/>
                <Row>
                    <Col sm={4}>
                        <List data={lists}/>
                    </Col>
                    <Col sm={8}>
                        <PopUp title={newTitle} delta={{quill}} style={{float: 'right'}} />
                        <Button style={{float: 'right'}} variant="secondary"
                            className={"button-margin"}
                            onClick={() =>
                                updateList(value, title, newTitle)}>Update</Button>{' '}
                        <Button style={{float: 'right'}}
                            className={"button-margin"}  variant="success"
                            onClick={() =>
                                saveList(value, title, email, newTitle)}>Create</Button>{' '}
                    </Col>
                </Row>
            </div>
            <br/>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Recipient's email"
                    aria-label="Recipient's email"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
                <Button style={{float: 'right'}} variant="info"
                    onClick={() => addUser(title, newUser)}>Add User</Button>{' '}
            </InputGroup>
        </Container>
    );
}
