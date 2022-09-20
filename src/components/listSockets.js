
export default function SocketList({users}) {
    const socketItems = users.map((_id, i) => {
        //console.log(_id);
        return (<ul key={i}>
            <li key={i}>{_id.name +" : "+ _id.msg}</li>
        </ul>);
    });

    return (
        <div className="list">
            {socketItems}
        </div>
    );
}
