import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquarePlus,
  faSquareMinus,
  faCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import Navbar from '../components/Navbar';
import AddFromFile from '../components/AddFromFile';
import AddFromUser from '../components/AddFromUser';

function Add() {
  // const nextId = 1;
  const [nextId, setNextId] = useState(1);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [tagCounts, setTagCounts] = useState([0]);
  const [tagInputs, setTagInputs] = useState([{ id: 0, name: '' }]);

  const handleToggleBtn = ({ target }) => {
    if (target.innerText === '입력하기') setToggleBtn(true);
    else setToggleBtn(false);
  };

  const addTag = (e) => {
    e.preventDefault();
    // setTagCounts([...tagCounts, Date.now()]);
    const input = {
      id: nextId,
      name: '',
    };

    setTagInputs([...tagInputs, input]);
    setNextId(nextId + 1);
  };

  const removeTag = (e, index) => {
    e.preventDefault();
    // console.log(e.target.id);
    // setTagCounts(
    //   tagCounts.filter((id) => {
    //     const result = id !== parseInt(e.target.id) ? true : false;
    //     console.log(e.target.id, id, result);
    //     return result;
    //   })
    // );
    setTagInputs(tagInputs.filter((tag) => tag.id !== index));
  };

  const handleTagBtn = (e, index) => {
    e.preventDefault();

    const tagInputsCopy = JSON.parse(JSON.stringify(tagInputs));
    // const tagInputsCopy = tagInputs.slice();
    tagInputsCopy[index].name = e.target.value;
    setTagInputs(tagInputsCopy);

    // if (e.target.id === 'addTag') {
    //   setTagCounts(tagCounts + 1);
    // }
    // else if (e.target.id === 'removeTag') {
    //   setTagCounts(tagCounts - 1)
    // }
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
