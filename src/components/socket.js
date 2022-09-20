import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SocketList from './listSockets.js';

export default function SocketEditor({socket}) {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    //----------CHAT ROOM------------------------------------------//

    //var messages = document.getElementById('messages');

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function sendMessage(e) {
        e.preventDefault();
        var myMessage = {};

        //console.log(message);
        if (message!=='') {
            socket.emit('chat message', message, name);
            myMessage = {name: "Me", msg: message};
            setUsers(users => [...users, myMessage]);
            //Problematic code. Array keeps adding. Yikes.
        }
        setMessage('');
    }

    useEffect(() => {
        if (socket) {
            socket.on("chat message", function (data) {
                console.log(data);
                setUsers(users => [...users, data]);
                //Problematic code. Array keeps adding. Yikes.
            });
        }
    }, [socket]);

    return (
        <Container>
            <SocketList users={users}/>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="titleLabel">Chat</Form.Label>
                    <Form.Control onChange={handleChange}
                        id="messageForm" value={message} placeholder="Send message.." />
                    <Form.Control onChange={handleName}
                        id="nameForm" value={name} placeholder="name" />
                </Form.Group>
                <Button type="submit" onClick={sendMessage}>Submit</Button>
            </Form>
        </Container>
    );
}
