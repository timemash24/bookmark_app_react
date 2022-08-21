import { useState } from 'react';
import Navbar from '../components/Navbar';
import AddFromFile from '../components/AddFromFile';
import AddFromUser from '../components/AddFromUser';
import '../css/Add.css';

function Add() {
  const btns = ['입력하기', '불러오기'];
  const [toggle, setToggle] = useState(true);
  const [toggleBtn, setToggleBtn] = useState('입력하기');

  const handleToggle = ({ target }) => {
    if (target.innerText === '입력하기') setToggleBtn('입력하기');
    else setToggleBtn('불러오기');
  };

  return (
    <div className="add">
      <Navbar />
      <section className="toggle">
        {btns.map((btn, i) =>
          btn === toggleBtn ? (
            <button key={i} className="selected" onClick={handleToggle}>
              {btn}
            </button>
          ) : (
            <button key={i} className="default" onClick={handleToggle}>
              {btn}
            </button>
          )
        )}
      </section>
      <main className="main">
        {toggleBtn === '입력하기' ? <AddFromUser /> : <AddFromFile />}
      </main>
    </div>
  );
}

export default Add;
