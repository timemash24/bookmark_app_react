import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux/es/exports';
import { addBookmarks } from '../routes/store';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import * as IndxdDBController from '../components/IndxdDBController';

function Edit({ bookmarks }) {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemTags, setItemTags] = useState([]);
  const [validTag, setValidTag] = useState(true);

  useEffect(() => {
    console.log(bookmarks);
    setList(bookmarks);
  }, [list]);

  const handleCheckbox = ({ target }) => {
    const id = parseInt(target.id);

    if (checkedIds.includes(id)) {
      if (checkedIds.length > 1)
        setItemName(bookmarks.find((bm) => bm.id === checkedIds[0]).name);
      else setItemName('');
      setCheckedIds(checkedIds.filter((itemId) => itemId !== id));
    } else {
      console.log('add id');
      setCheckedIds([...checkedIds, id]);
      setItemName(bookmarks.find((bm) => bm.id === id).name);
      setItemTags(bookmarks.find((bm) => bm.id === id).tags);
    }
  };

  const nameInputHandler = ({ target }) => {
    setItemName(target.value);
  };

  const tagInputHandler = (e, index) => {
    console.log(e.target.value);

    const tags = [...itemTags];
    const newTags = tags.map((tag, i) => {
      if (i === index) return e.target.value;
      else return tag;
    });

    if (newTags[0] === '') setValidTag(false);
    else setValidTag(true);

    setItemTags(newTags);
  };

  const removeBookmarkBtn = (e, id) => {
    e.preventDefault();
    // setNewBookmarks(newBookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const updateBookmark = (id) => {
    IndxdDBController.updateDBValue('name', id, itemName);
    IndxdDBController.updateDBValue('tags', id, itemTags);
  };

  const handleSavebtn = (e) => {
    e.preventDefault();

    // 개별 변경
    if (checkedIds.length === 1 && validTag) {
      updateBookmark(checkedIds[0]);
      navigate('/');
    }
  };

  return (
    <div>
      <Navbar />
      <form>
        <section>
          <p>
            <label htmlFor="name">이름</label>
            {checkedIds.length <= 1 ? (
              <input
                type="text"
                name="name"
                value={itemName}
                onChange={nameInputHandler}
                disabled={checkedIds.length ? false : true}
              />
            ) : null}
          </p>
          <div>
            <label htmlFor="tags">태그</label>
            {bookmarks.map((bm, i) =>
              checkedIds.length === 1 && bm.id === checkedIds[0] ? (
                <p key={`checked${i}`}>
                  {bm.tags.map((_, j) => (
                    <input
                      key={`checkedTag${j}`}
                      name="tag"
                      value={itemTags[j]}
                      onChange={(e) => tagInputHandler(e, j)}
                    />
                  ))}
                </p>
              ) : null
            )}
            {validTag ? null : <p>⚠ need at least one tag ⚠</p>}
            {checkedIds.length > 1 ? <input type="text" name="tags" /> : null}
            <button onClick={handleSavebtn}>변경사항 저장✨</button>
          </div>
        </section>
        <ul>
          {bookmarks.map((bm, i) => (
            <li key={`checkbox${i}`}>
              <input id={bm.id} type="checkbox" onChange={handleCheckbox} />
              <span>이름 : {bm.name}</span>
              <span>태그 : {bm.tags.map((tag) => `# ${tag} `)}</span>
              <button onClick={(e) => removeBookmarkBtn(e, bm.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return { bookmarks: state };
}

export default connect(mapStateToProps)(Edit);
