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

export default function Editor({lists, submitFunction, socket}) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    //const [room, setRoom] = useState('');
    const items = lists;

    async function saveList(text, title) {
        await editorModel.saveList(title, text);

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
        let dataEmit = {
            _id: {title},
            html: e
        };

        if (socket) {
            socket.emit("document", dataEmit);
        }
        setValue(e);
    }

    useEffect(() => {
        socket.on("document", (data) => {
            if ({title}.title == data["_id"].title) {
                setValue(data["html"]);
            } else {
                console.log("wrong room");
            }
        });
    }, [title]);

    function joinRoom(e) {
        //socket.emit("leave", room);
        if (socket) {
            socket.emit("editor", e);
        //    setRoom(e);
        } else {
            console.log("socket error");
        }
    }

    return (
        <Container>
            <h3>
                {title}
            </h3>
            <ReactQuill id="quillEditor" theme="snow"
                value={value} onChange={(e) => onChangeEffect(e)} />
            <Row>
                <Col sm={4}>
                    <List data={lists}/>
                </Col>
                <Col sm={8}>
                    <Button style={{float: 'right'}} variant="secondary"
                        onClick={() => updateList(value, title)}>Update</Button>{' '}
                    <Button style={{float: 'right'}} variant="success"
                        onClick={() => saveList(value, title)}>Create</Button>{' '}
                </Col>
            </Row>
        </Container>
    );
}
