import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SocketList from './listSockets.js';
import "../css/listchat.css";

export default function SocketEditor({socket, email}) {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);

    //----------CHAT ROOM------------------------------------------//

    //var messages = document.getElementById('messages');

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function sendMessage(e) {
        e.preventDefault();
        var myMessage = {};

        console.log(email);
        if (message!=='') {
            socket.emit('chat message', message, email);
            myMessage = {name: email, msg: message, code: "primary"};
            setUsers(users => [...users, myMessage]);
        }
        setMessage('');
    }

    useEffect(() => {
        if (socket) {
            socket.on("chat incoming", function (data) {
                console.log(data);
                setUsers(users => [...users, data]);
            });
        }
    }, [socket]);

    return (
        <Container className="chat-container">
            <SocketList users={users}/>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="titleLabel">Chat</Form.Label>
                    <Form.Control onChange={handleChange}
                        id="messageForm" value={message} placeholder="Send message.." />
                </Form.Group>
                <Button type="submit" onClick={sendMessage}>Submit</Button>
            </Form>
        </Container>
    );
}
