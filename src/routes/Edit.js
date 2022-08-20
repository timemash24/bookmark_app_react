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
  const [tagToAdd, setTagToAdd] = useState('');
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

  const handleNameInput = ({ target }) => {
    setItemName(target.value);
  };

  const handleTagInput = (e, index) => {
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

  const handleNewTag = (e) => {
    setTagToAdd(e.target.value);
  };

  const updateBookmark = (id) => {
    IndxdDBController.updateDBValue('name', id, itemName);
    IndxdDBController.updateDBValue('tags', id, itemTags);
  };

  const addTags = (ids, newTag) => {
    for (const id of ids) {
      let newTags = [];
      for (const bm of list) {
        if (bm.id === id) {
          const tags = bm.tags;
          newTags = [...tags, newTag];
          IndxdDBController.updateDBValue('tags', id, newTags);
          break;
        }
      }
    }
  };

  const handleSavebtn = (e) => {
    e.preventDefault();
    if (!validTag) return;

    // 개별 변경
    if (checkedIds.length === 1) {
      updateBookmark(checkedIds[0]);
      navigate('/');
    }

    // 태그 일괄 추가
    else {
      console.log(tagToAdd);
      addTags(checkedIds, tagToAdd);
      // checkedIds.forEach((id) => {

      //   IndxdDBController.updateDBValue('tags', id, itemTags);
      // })
      navigate('/');
    }
  };

  return (
    <div>
      <Navbar />
      <form>
        <section>
          {checkedIds.length === 1 ? (
            <div>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                name="name"
                value={itemName}
                onChange={handleNameInput}
                disabled={checkedIds.length ? false : true}
              />
            </div>
          ) : null}
          <div>
            {bookmarks.map((bm, i) =>
              checkedIds.length === 1 && bm.id === checkedIds[0] ? (
                <div key={`checked${i}`}>
                  {bm.tags.map((_, j) => (
                    <p>
                      <label htmlFor="tag">태그</label>
                      <input
                        key={`checkedTag${j}`}
                        name="tag"
                        value={itemTags[j]}
                        onChange={(e) => handleTagInput(e, j)}
                      />
                    </p>
                  ))}
                </div>
              ) : null
            )}
            {validTag ? null : <p>⚠ need at least one tag ⚠</p>}
            {checkedIds.length > 1 ? (
              <p>
                <label htmlFor="newTag">태그</label>
                <input type="text" name="newTag" onChange={handleNewTag} />
              </p>
            ) : null}
            {checkedIds.length > 0 ? (
              <button onClick={handleSavebtn}>변경사항 저장✨</button>
            ) : null}
          </div>
        </section>
        <ul>
          {bookmarks.map((bm, i) => (
            <li key={`checkbox${i}`}>
              <input
                id={bm.id}
                type="checkbox"
                value={tagToAdd}
                onChange={handleCheckbox}
              />
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
