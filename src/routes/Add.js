import { useState } from 'react';
import Navbar from '../components/Navbar';
import AddFromFile from '../components/AddFromFile';
import AddFromUser from '../components/AddFromUser';

function Add() {
  const [toggleBtn, setToggleBtn] = useState(true);

  const handleToggleBtn = ({ target }) => {
    if (target.innerText === '입력하기') setToggleBtn(true);
    else setToggleBtn(false);
  };

  return (
    <div>
      <Navbar />
      <section>
        <button onClick={handleToggleBtn}>입력하기</button>
        <button onClick={handleToggleBtn}>불러오기</button>
      </section>
      {toggleBtn ? <AddFromUser /> : <AddFromFile />}
    </div>
  );
}

export default Add;
