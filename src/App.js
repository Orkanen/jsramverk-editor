import React, { useState, useEffect } from 'react';
import Editor from './components/editor.js';
import SocketEditor from './components/socket.js';
import editorModel from './models/editor';
import { io } from "socket.io-client";
import Login from './components/login.js';

const base = io('https://jsramverk-editor-fian12.azurewebsites.net');

export default function App() {
    const [list, setList] = useState([]);
    const [socket, setSocket] = useState(base);
    const [token, setToken] = useState("");
    const [userEmail, setUserEmail] = useState("");

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
        //const docs = await editorModel.getList(token);
        const docs = await editorModel.getUserLists(token, userEmail);

        setList(docs);
        //console.log(email);
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
                    < Editor lists={list} submitFunction={fetchList} socket={socket}
                        email={userEmail} />
                    < SocketEditor socket={socket} />
                </>
                :
                <Login setToken={setToken} setUserEmail={setUserEmail} />
            }
        </div>
    );
}

