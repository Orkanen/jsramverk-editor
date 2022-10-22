import ListGroup from 'react-bootstrap/ListGroup';
import "../css/listchat.css";
import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ListComment({item, comment, index1, index2, quill, removeComment}) {
    return (
        <ListGroup className="" key={`${item}+group`} style={{display: "flex"}}>
            <ListGroup.Item key={`${item}+comment`}
                onMouseEnter={() =>
                    quill.quill.current.editor.formatText(index1, index2, "background", "#fc4b5c")}
                onMouseLeave={() =>
                    quill.quill.current.editor.formatText(index1, index2, "background", "#ffba32")}>
                {comment}
            </ListGroup.Item>
            <Button variant="outline-danger" onClick={() => removeComment(item, index1, index2)}>
                Delete
            </Button>
        </ListGroup>
    );
}
