import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function App() {
  const [value, setValue] = useState('');
  return (
    <div className="App">
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <button onClick={() => console.log(value)}>Save</button>
    </div>
  );
}

export default App;
