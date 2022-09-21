import ListGroup from 'react-bootstrap/ListGroup';
import "../css/listchat.css";

export default function ListChat({item, code, name, message}) {
    var temp = "success";

    if (code == "primary") {
        temp = "primary";
    }
    return (
        <ListGroup className="">
            <ListGroup.Item className={"card-"+temp} key={item} variant={code}>
                {name +" : "+ message}
            </ListGroup.Item>
        </ListGroup>
    );
}
