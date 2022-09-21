import ListGroup from 'react-bootstrap/ListGroup';
import "../css/listchat.css";

export default function ListChat({item, code, name, message}) {
    return (
        <ListGroup className="">
            <ListGroup.Item className={"card-"+code} key={item} variant={code}>
                {name +" : "+ message}
            </ListGroup.Item>
        </ListGroup>
    );
}
