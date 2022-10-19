import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../css/listchat.css";

export default function Comment({editor, comments, setComments}) {
    const [show, setShow] = useState(false);
    const [currentSelection, setCurrentSelection] = useState('');
    const [currentIndex, setCurrentIndex] = useState('');
    const [newValue, setNewValue] = useState('');

    const handleClose = () => {
        setShow(false),
        setCurrentSelection(''),
        setNewValue('');
    };
    const handleShow = () => {
        setShow(true),
        setCurrentIndex(selectedIndex(editor)),
        setCurrentSelection(selectedText(editor));
    };

    function selectedText(quill) {
        if (quill.quill.current) {
            if (quill.quill.current.selection) {
                var range = quill.quill.current.selection;
                var text = quill.quill.current.editor.container.innerText;

                return text.substr(range.index, range.length);
            } else {
                return "No selection made.";
            }
        }
    }

    function selectedIndex(quill) {
        if (quill.quill.current) {
            if (quill.quill.current.selection) {
                var range = quill.quill.current.selection;

                return [range.index, range.length];
            } else {
                return null;
            }
        }
    }

    function saveComment(comment, index, quill) {
        if (index) {
            const editor = quill.quill.current.getEditor();

            if (comment) {
                var temp = {comments}.comments.comments;

                if (temp) {
                    temp.push({comment: comment, index: index});
                    editor.format("background", "yellow");
                    handleClose();
                } else {
                    setComments([{comment: comment, index: index}]);
                    editor.format("background", "yellow");
                    handleClose();
                }
            }
        }
    }

    return (
        <>
            <Modal className="comment-modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentSelection}
                    <InputGroup className="mb-3">
                        <Button variant={currentIndex && newValue ? "primary" : "secondary"}
                            onClick={() => saveComment(newValue, currentIndex, editor)}>
                            Save
                        </Button>
                        <Form.Control aria-label="Example text with two button addons"
                            onChange={(e) => setNewValue(e.target.value)}
                            value={newValue}/>
                    </InputGroup>
                </Modal.Body>
            </Modal>
            <Button variant="outline-primary" onClick={handleShow}
                className={"button-margin"} style={{float: 'right'}}>
                Comment
            </Button>
        </>
    );
}
