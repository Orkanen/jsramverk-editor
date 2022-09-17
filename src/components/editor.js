import React, { useState } from 'react';
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

export default function Editor({lists, submitFunction}) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const items = lists;

    console.log(lists);

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
                    {props.data.map((post, i) =>
                        <Dropdown.Item key={i} onClick={() => fetchItem({i})}>{post._id},
                            {post.docTitle}</Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </DropdownButton>
        );

        return (
            <div>{sidebar}</div>
        );
    }

    function fetchItem(number) {
        setValue(items[{number}.number.i].docText);
        setTitle(items[{number}.number.i]._id);
    }

    return (
        <Container>
            <h3>
                {title}
            </h3>
            <ReactQuill theme="snow" value={value} onChange={setValue} />
            <Row>
                <Col sm={4}>
                    <List data={items}/>
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
