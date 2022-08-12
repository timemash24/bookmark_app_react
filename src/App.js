import React from 'react';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [fileResult, setFileResult] = useState('');
  const [textArr, setTextArr] = useState([]);

  const onChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      setFileResult(fileReader.result);
    };
    fileReader.readAsText(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const arr = fileResult.split('\n');
    console.log(arr);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>북마크 html 파일을 선택하세요</label>
        <input type="file" accept=".html" onChange={onChange} />
        <input type="submit" value="추가✨" />
      </form>
    </div>
  );
}

export default App;
