import ListGroup from 'react-bootstrap/ListGroup';
import "../css/listchat.css";
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

export default function ListComment({item, comment, index1, index2, quill, removeComment}) {
    const [newEditor, setNewEditor] = useState(null);

    useEffect(() => {
        if (newEditor) {
            newEditor.formatText(index1, index2, "background", "yellow");
        }
    }, [newEditor]);

    useEffect(() => {
        if (quill.quill.current) {
            setNewEditor({quill}.quill.quill.current.editor);
        }
    }, [quill]);

    function rmvComment(item, index1, index2) {
        removeComment(item);
        if (newEditor) {
            newEditor.formatText(index1, index2, "background", "white");
        }
    }

    return (
        <ListGroup className="" key={`${item}+group`} style={{display: "flex"}}>
            <ListGroup.Item key={`${item}+comment`}
                onMouseEnter={() => newEditor.formatText(index1, index2, "background", "red")}
                onMouseLeave={() => newEditor.formatText(index1, index2, "background", "yellow")}>
                {comment}
            </ListGroup.Item>
            <Button onClick={() => rmvComment(item, index1, index2)}>
                Delete
            </Button>
        </ListGroup>
    );
}
