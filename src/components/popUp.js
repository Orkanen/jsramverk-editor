import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PdfViewer from "./pdfViewer";

export default function PopUp({title, delta}) {
    const [show, setShow] = useState(false);
    const [newDelta, setNewDelta] = useState(null);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (delta.quill.current) {
            //console.log(delta.quill.current.editor.getContents());
            setNewDelta(delta.quill.current.editor.getContents());
        }
    }, [delta]);


    return (
        <>
            <Button variant="primary" style={{float: 'right'}} onClick={handleShow}>
                PDF-Viewer
            </Button>

            <Modal className="pdf-modal" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PdfViewer deltaPdf={newDelta} title={title}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
