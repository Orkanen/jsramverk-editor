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
import Comment from "./comment";
import ListComments from "./listComments";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import {Buffer} from 'buffer';
import "../css/listchat.css";

export default function Editor({lists, submitFunction, socket, email}) {
    const [title, setTitle] = useState('New Title');
    const [value, setValue] = useState('');
    const [room, setRoom] = useState('');
    const [newUser, setNewUser] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [comments, setComments] = useState([]);
    const [codeMode, setCodeMode] = useState(false);
    //const [newDelta, setNewDelta] = useState('');
    const items = lists;
    const quill = useRef();

    async function saveList(text, id, email, title, comments, code) {
        await editorModel.saveList(id, text, email, title, comments, code);

        submitFunction();
    }

    async function updateList(text, id, title, comments, code) {
        await editorModel.updateList(id, text, title, comments, code);

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

    async function updateArray(array) {
        setComments(array);
    }

    async function fetchItem(number) {
        setTitle(items[{number}.number.i]._id);
        setValue(items[{number}.number.i].docText);
        setNewTitle(items[{number}.number.i].docTitle);
        setComments(items[{number}.number.i].comments);
        setCodeMode(items[{number}.number.i].code);
    }

    function onChangeEffect(e) {
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

    async function addUser(id, value, email) {
        if (value && id) {
            //console.log(id, " + ", value);
            await editorModel.addOwner(id, value, email);

            submitFunction();
        }
    }

    function titleSplitter(title) {
        var temp = "Add Title";

        try {
            if (!codeMode) {
                temp = title ? (title.split(">")[1]).split("<")[0]  : "Add Title";
            }
        } catch {
            //console.log("Title could not be split");
        }
        return temp;
    }

    function codeToBase64(value) {
        const encodedString = Buffer.from(value).toString('base64');

        return encodedString;
    }

    return (
        <div className="container-holder">
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
                            placeholder={titleSplitter(value)}
                            aria-label="title"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setNewTitle(e.target.value)}
                            value={newTitle}
                        />
                    </InputGroup>
                    {codeMode ?
                        <CodeMirror
                            value={value}
                            onChange={(e) => onChangeEffect(e)}
                            height="200px"
                            extensions={[javascript({ jsx: true })]}
                        />
                        :
                        <ReactQuill id="quillEditor" theme="snow"
                            value={value} onChange={(e) =>
                                onChangeEffect(e)}
                            style={{ whiteSpace: 'pre-wrap' }}
                            ref={quill}
                        />
                    }
                    <br/>
                    <Row>
                        <Col sm={4}>
                            <List data={lists}/>
                        </Col>
                        <Col sm={8}>
                            {codeMode ?
                                <>
                                    <Button style={{float: 'right'}} variant="outline-primary"
                                        className={"button-margin"}
                                        onClick={() =>
                                            console.log(codeToBase64(value))}>
                                                Execute
                                    </Button>{' '}
                                </>
                                :
                                <>
                                    <PopUp title={newTitle} delta={{quill}}/>
                                    <Comment editor={{quill}} comments={{comments}}
                                        setComments={setComments} />
                                </>
                            }
                            <Button style={{float: 'right'}} variant="outline-success"
                                className={"button-margin"}
                                onClick={() =>
                                    updateList(value, title, newTitle, comments, codeMode)}>
                                        Update
                            </Button>{' '}
                            <Button style={{float: 'right'}}
                                className={"button-margin"}  variant="success"
                                onClick={() =>
                                    saveList(value, title, email, newTitle, comments, codeMode)}>
                                        Create
                            </Button>{' '}
                            <Button style={{float: 'right'}}
                                className={"button-margin"}  variant="warning"
                                onClick={() => setCodeMode(!codeMode)}>
                                {codeMode ? "Editor-mode" : "Code-mode"}
                            </Button>{' '}
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
                        onClick={() => addUser(title, newUser, email)}>Add User</Button>{' '}
                </InputGroup>
            </Container>
            <div className="comment-list">
                <ListComments editor={{quill}} comments={comments} setArray={updateArray} />
            </div>
        </div>
    );
}
