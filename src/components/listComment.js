import ListGroup from 'react-bootstrap/ListGroup';
import "../css/listchat.css";
import React, { useState, useEffect } from 'react';

export default function ListComment({item, comment, index1, index2, quill}) {
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

    return (
        <ListGroup className="" key={`${item}+group`}>
            <ListGroup.Item key={`${item}+comment`}
                onMouseEnter={() => newEditor.formatText(index1, index2, "background", "red")}
                onMouseLeave={() => newEditor.formatText(index1, index2, "background", "yellow")}>
                {comment}
            </ListGroup.Item>
        </ListGroup>
    );
}
