import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquarePlus,
  faSquareMinus,
  faCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import * as IndxdDBController from './IndxdDBController';

function AddFromUser() {
  const [nextId, setNextId] = useState(1);
  const [tagInputs, setTagInputs] = useState([{ id: 0, name: '' }]);
  const [newBookmarks, setNewBookmarks] = useState([]);

  const addTag = (e) => {
    e.preventDefault();
    const input = {
      id: nextId,
      name: '',
    };

    setTagInputs([...tagInputs, input]);
    setNextId(nextId + 1);
  };

  const removeTag = (e, index) => {
    e.preventDefault();
    setTagInputs(tagInputs.filter((tag) => tag.id !== index));
  };

  const handleTagBtn = (e, index) => {
    e.preventDefault();
    const tagInputsCopy = tagInputs.slice();
    tagInputsCopy[index].name = e.target.value;
    setTagInputs(tagInputsCopy);
  };

  const onSubmit = (e) => {
    e.preventDefault();
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

  const onClick = () => {
    // 북마크 db에 저장
    console.log(newBookmarks);
    IndxdDBController.writeDB(newBookmarks);
    setNewBookmarks([]);
  };

  return (
    <div>
      <section>
        <form onSubmit={onSubmit}>
          <span>
            <label>이름 : </label>
            <input type="text" />
          </span>
          <span>
            <label>url : </label>
            <input type="text" />
          </span>
          <div>
            {tagInputs.map((input, index) => (
              <p key={index}>
                <label>태그{index + 1} : </label>
                <input
                  type="text"
                  onChange={(e) => handleTagBtn(e, index)}
                  value={input.name}
                />
                {index === 0 ? (
                  <button onClick={addTag}>
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </button>
                ) : (
                  <button onClick={(e) => removeTag(e, input.id)}>
                    <FontAwesomeIcon icon={faSquareMinus} />
                  </button>
                )}
              </p>
            ))}
          </div>
          <button>
            <FontAwesomeIcon icon={faCheckSquare} />
          </button>
        </form>
      </section>
      <section>
        {newBookmarks.map((newBm, i) => (
          <div key={`new${i}`}>
            <span>이름: {newBm.name}</span>
            <span>url: {newBm.url}</span>
            <span>
              태그:{' '}
              {newBm.tags.map((tag, j) => (
                <span key={`${i}${j}`}>{tag}</span>
              ))}
            </span>
          </div>
        ))}
      </section>
      <button onClick={onClick}>저장✨</button>
    </div>
  );
}

export default AddFromUser;
