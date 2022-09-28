import React, { useState, useEffect } from 'react';
import Editor from './components/editor.js';
import SocketEditor from './components/socket.js';
import editorModel from './models/editor';
import { io } from "socket.io-client";
import Login from './components/login.js';

const base = io();

export default function App() {
    const [list, setList] = useState([]);
    const [socket, setSocket] = useState(base);
    const [token, setToken] = useState("");

    //use http://localhost:1337 when local
    //https://jsramverk-editor-fian12.azurewebsites.net

    useEffect(() => {
        setSocket(io(`${editorModel.baseUrl}`));

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);

    async function fetchList() {
        const docs = await editorModel.getList(token);

        setList(docs);
    }

    useEffect(() => {
        (async () => {
            await fetchList();
        })();
    }, [token]);

    return (
        < div>
            {token ?
                <>
                    < Editor lists={list} submitFunction={fetchList} socket={socket} />
                    < SocketEditor socket={socket} />
                </>
                :
                <Login setToken={setToken} />
            }
        </div>
    );
}

