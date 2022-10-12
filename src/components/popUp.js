import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PdfViewer from "./pdfViewer";
import { saveAs } from 'file-saver';

export default function PopUp({title, delta}) {
    const [show, setShow] = useState(false);
    const [newBlob, setNewBlob] = useState(null);
    const [newDelta, setNewDelta] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (delta.current) {
            setNewDelta(delta.current.editor.getContents());
        }
    }, [delta]);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PdfViewer deltaPdf={newDelta} setBlob={setNewBlob}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary"
                        onClick = {() => {
                            //console.log({newBlob}.newBlob);
                            ({newBlob}).newBlob.then(function(result) {
                                saveAs(result, `${title}.pdf`);
                            });
                        }}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
