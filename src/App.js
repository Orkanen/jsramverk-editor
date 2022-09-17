import React, { useState, useEffect } from 'react';
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
import Editor from './components/editor.js';
import editorModel from './models/editor';

export default function App() {
    const [list, setList] = useState([]);

    async function fetchList() {
        const docs = await editorModel.getList();

        setList(docs);
    }

    useEffect(() => {
        (async () => {
            await fetchList();
        })();
    }, []);


    return (
        < Editor lists={list} submitFunction={fetchList} />
    );
}

