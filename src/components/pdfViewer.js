import { pdfExporter } from 'quill-to-pdf';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import Button from 'react-bootstrap/Button';

async function pdfMaker(givenDelta) {
    if (givenDelta) {
        var pdfAsBlob = await pdfExporter.generatePdf(
            givenDelta
        );

        //console.log(pdfAsBlob);
        return pdfAsBlob;
    }
}

export default function PdfViwer({deltaPdf, title}) {
    const [numPages, setNumPages] = useState(null);
    const [newBase64, setNewBase64] = useState(null);

    pdfjs.GlobalWorkerOptions.workerSrc =
        `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function blobToBase64(blob) {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    async function promiseHandler(delta) {
        try {
            var newResult = pdfMaker(delta.deltaPdf).then(function(result) {
                var base64 = blobToBase64(result);

                //console.log(base64);
                return base64;
            });

            var temp = await newResult;

            //console.log(temp);

            return temp;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await promiseHandler({deltaPdf});

            setNewBase64(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            {{newBase64}.newBase64 ?
                <>
                    <Document file={{newBase64}.newBase64}
                        onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={1} />
                    </Document>
                    <p>
                        {/*console.log({newBase64}.newBase64)*/}
                        Page {numPages}
                    </p>
                </>
                :
                <>
                    <div>
                        Error Loading.
                    </div>
                </>
            }
            <Button variant="primary"
                onClick = {() => {
                    //console.log(title, pdfMaker({deltaPdf}.deltaPdf));
                    pdfMaker({deltaPdf}.deltaPdf).then(function(result) {
                        saveAs(result, `${title}.pdf`);
                    });
                }}>
                Save PDF
            </Button>
        </div>
    );
}
