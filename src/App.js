import React, { useState, useEffect } from 'react';
import Editor from './components/editor.js';
import SocketEditor from './components/socket.js';
import editorModel from './models/editor';
import { io } from "socket.io-client";

const base = io();

export default function App() {
    const [list, setList] = useState([]);
    const [socket, setSocket] = useState(base);

    //use http://localhost:1337 when local
    //https://jsramverk-editor-fian12.azurewebsites.net

    useEffect(() => {
        setSocket(io('https://jsramverk-editor-fian12.azurewebsites.net'));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

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
        < div>
            < Editor lists={list} submitFunction={fetchList} socket={socket} />
            < SocketEditor socket={socket} />
        </div>
    );
}

