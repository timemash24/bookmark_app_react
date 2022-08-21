import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquarePlus,
  faCheckSquare,
  faTrashCan,
} from '@fortawesome/free-regular-svg-icons';
import * as IndxdDBController from './IndxdDBController';

const URL_REGEX = /https?:\/\/.+\..+/;

function AddFromUser() {
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(1);
  const [tagInputs, setTagInputs] = useState([{ id: 0, name: '' }]);
  const [newBookmarks, setNewBookmarks] = useState([]);
  const [validURL, setValidURL] = useState(true);

  const checkValidURL = (e) => {
    if (URL_REGEX.test(e.target.value)) setValidURL(true);
    else setValidURL(false);
  };

  const addTagBtn = (e) => {
    e.preventDefault();
    const input = {
      id: nextId,
      name: '',
    };

    setTagInputs([...tagInputs, input]);
    setNextId(nextId + 1);
  };

  const removeTagBtn = (e, id) => {
    e.preventDefault();
    setTagInputs(tagInputs.filter((tag) => tag.id !== id));
  };

  const handleTagInput = (e, index) => {
    e.preventDefault();
    const tagInputsCopy = tagInputs.slice();
    tagInputsCopy[index].name = e.target.value;
    setTagInputs(tagInputsCopy);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validURL) return;
    const target = e.target;
    const len = target.length;
    const tags = [];
    for (let i = 2; i < len - 1; i += 2) {
      tags.push(target[i].value);
    }

    const newBookmark = {
      id: Date.now(),
      name: target[0].value,
      url: target[1].value,
      tags: tags,
      visit: 0,
    };

    for (let i = 0; i < len; i++) {
      if (target[i].value) target[i].value = '';
    }
    setNewBookmarks([...newBookmarks, newBookmark]);
    setTagInputs([{ id: 0, name: '' }]);
  };

  const removeBookmarkBtn = (e, id) => {
    e.preventDefault();
    setNewBookmarks(newBookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleSaveBtn = () => {
    // 북마크 db에 저장
    console.log(newBookmarks);
    if (newBookmarks.length) {
      IndxdDBController.writeDB(newBookmarks);
      setNewBookmarks([]);
      window.alert('성공적으로 추가되었습니다✍');
      navigate('/');
    }
  };

  return (
    <div>
      <section className="user_inputs">
        <form onSubmit={onSubmit}>
          <div className="user_input">
            <label>이름 : </label>
            <input type="text" />
          </div>
          {validURL ? null : (
            <span className="alert">⚠ 유효하지 않은 주소 형식 ⚠</span>
          )}
          <div className="user_input">
            <label>URL : </label>
            <input type="text" onChange={checkValidURL} />
          </div>

          <ul className="tag_inputs">
            {tagInputs.map((input, index) => (
              <li key={index} className="tag_input">
                <label>태그 {index + 1} : </label>
                <input
                  type="text"
                  onChange={(e) => handleTagInput(e, index)}
                  value={input.name}
                />
                {index === 0 ? (
                  <button className="tag_btn" onClick={addTagBtn}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </button>
                ) : (
                  <button
                    className="tag_btn"
                    onClick={(e) => removeTagBtn(e, input.id)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button className="add_btn">추가</button>
        </form>
      </section>
      <button className="save_btn" onClick={handleSaveBtn}>
        저장✨
      </button>
      <ul className="new_list">
        {newBookmarks.map((newBm, i) => (
          <li className="new_bookmark" key={`new${i}`}>
            <span>이름: {newBm.name}</span>
            <span>url: {newBm.url}</span>
            <span>
              태그:{' '}
              {newBm.tags.map((tag, j) => (
                <span key={`${i}${j}`}>{tag}</span>
              ))}
            </span>
            <button onClick={(e) => removeBookmarkBtn(e, newBm.id)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddFromUser;
