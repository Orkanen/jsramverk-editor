import { pdfExporter } from 'quill-to-pdf';
//import React, { useState } from 'react';
//import { Document, Page } from 'react-pdf';
//import Delta from 'quill-delta';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';

async function pdfMaker(givenDelta) {
    const pdfAsBlob = await pdfExporter.generatePdf(
        givenDelta
    );

    //console.log(pdfAsBlob);
    return pdfAsBlob;
}

export default function PdfViwer({deltaPdf, setBlob}) {
    useEffect(() => {
        if (deltaPdf) {
            setBlob(pdfMaker(deltaPdf));
            //console.log(deltaPdf);
        }
    }, [deltaPdf]);

    return (
        <Button variant="primary"
            onClick = {() => {
                setBlob(pdfMaker(deltaPdf));
            }}>
        Show Pdf
        </Button>
    );
}
