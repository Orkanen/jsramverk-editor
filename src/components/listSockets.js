import ListChat from "./listChat.js";
import "../css/listchat.css";

export default function SocketList({users}) {
    const socketItems = users.map((_id, i) => {
        //console.log(_id);
        return (
            <ListChat
                item={i}
                code={_id.code}
                name={_id.name}
                message={_id.msg}
            />
        );
    });

    return (
        <div className="chat-list">
            <div className="chat-flex">
                {socketItems}
            </div>
        </div>
    );
}
