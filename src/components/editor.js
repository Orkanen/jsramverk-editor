import { queryAllByAltText } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch("https://jsramverk-editor-fian12.azurewebsites.net/list")
      .then(res => res.json())
      .then(data => {
        setValue(data[0].name);
        console.log(data[0].name);
        //query(data);
      });
  }, []);

  return (
    <div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <button onClick={() => console.log(value)}>console</button>
    </div>
  );
}