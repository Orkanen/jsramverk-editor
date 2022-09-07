import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import editorModel from '../models/editor';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Editor(props) {
  const [items, setItems] = useState([{name:'loading..'}]);
  const [title, setTitle] = useState('loading..');
  const [value, setValue] = useState('loading..');

  async function fetchList() {
    const docs = await editorModel.getList();
    setValue(docs[0].name);
    setTitle(docs[0]._id);
    setItems(docs);
  }

  function List(props) {
    //console.log(props.data);
    const sidebar = (
      <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Menu>
          {props.data.map((post,i) =>
            <Dropdown.Item key={i} onClick={() => fetchItem({i})}>{post._id}, {post.name}</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </DropdownButton>
    );
    return (
      <div>{sidebar}</div>
    );
  }

  function fetchItem(number) {
    setValue(items[{number}.number.i].name);
    setTitle(items[{number}.number.i]._id);
  }

  useEffect(() => {
    (async () => {
      await fetchList();
    })();
  }, []);
  
  return (
    <Container>
      <h3>
        {title}
      </h3>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <Row>
        <Col sm={4}>
          <List data={items}/>
        </Col>
        <Col sm={8}>
          <Button style={{float: 'right'}} variant="secondary" onClick={() => console.log(value, title)}>Update</Button>{' '}
          <Button style={{float: 'right'}} variant="success" onClick={() => console.log(value)}>Create</Button>{' '}
        </Col>
      </Row>
    </Container>
  );
}