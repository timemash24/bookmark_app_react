import { faSquarePlus, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import * as IndxdDBController from '../components/IndxdDBController';
import Navbar from '../components/Navbar';
import '../css/Edit.css';
import { addBookmarks, removeBookmark } from '../routes/store';
const refreshIcon = require('../img/refresh_icon.PNG');

function Edit({ bookmarks, addBookmarks, removeBookmark }) {
  const data = IndxdDBController.getAllDBValues();
  const navigate = useNavigate();
  const [nextId, setNextId] = useState(1);
  const [list, setList] = useState([]);
  const [checkedIds, setCheckedIds] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemTags, setItemTags] = useState([]);
  const [tagToAdd, setTagToAdd] = useState('');
  const [validTag, setValidTag] = useState(true);

  useEffect(() => {
    setList(bookmarks);
  }, []);

  const onClick = () => {
    // visit 많은 순 - 사전순으로 정렬
    const sorted = data.sort((a, b) => {
      // return b.visit - a.visit;
      if (a.visit < b.visit) return 1;
      else if (a.visit > b.visit) return -1;
      else {
        if (a.name > b.name) return 1;
        else return -1;
      }
    });
    setList(sorted);
    addBookmarks(sorted);
  };

  const addTagBtn = (e) => {
    e.preventDefault();
    // console.log(itemTags);
    setItemTags([...itemTags, '']);
    setNextId(nextId + 1);
  };

  const removeTagBtn = (e, index) => {
    e.preventDefault();
    setItemTags(itemTags.filter((_, i) => i !== index));
  };

  const handleCheckbox = (e) => {
    const id = parseInt(e.target.id);

    if (checkedIds.includes(id)) {
      const checked = checkedIds.filter((itemId) => itemId !== id);
      if (checked.length === 1) {
        setItemName(bookmarks.find((bm) => bm.id === checked[0]).name);
        setItemTags(bookmarks.find((bm) => bm.id === checked[0]).tags);
      }
      setCheckedIds(checked);
    } else {
      setCheckedIds([...checkedIds, id]);
      setItemName(bookmarks.find((bm) => bm.id === id).name);
      setItemTags(bookmarks.find((bm) => bm.id === id).tags);
    }
  };

  const handleNameInput = (e) => {
    setItemName(e.target.value);
  };

  const handleTagInput = (e, index) => {
    // console.log(e.target.value);

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
    if (window.confirm('⚠삭제하시겠습니까?⚠')) {
      IndxdDBController.deleteDBValue(id);
      removeBookmark(id);
      window.alert('삭제하였습니다💨');
      navigate('/');
    }
  };

  const handleNewTag = (e) => {
    setTagToAdd(e.target.value);
  };

  const updateBookmark = (id) => {
    IndxdDBController.updateDBValue('name', id, itemName);
    IndxdDBController.updateDBValue('tags', id, itemTags);
  };

  const addTagsToSelected = (ids, newTag) => {
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

  const handleSaveBtn = (e) => {
    e.preventDefault();
    if (!validTag) return;

    // 개별 변경
    if (checkedIds.length === 1) {
      updateBookmark(checkedIds[0]);
      window.alert('성공적으로 수정되었습니다✍');
      navigate('/');
    }

    // 태그 일괄 추가
    else {
      // console.log(tagToAdd);
      addTagsToSelected(checkedIds, tagToAdd);
      window.alert('성공적으로 수정되었습니다✍');
      navigate('/');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="edit">
        <div onClick={onClick}>
          <img src={refreshIcon} alt="refresh" />
        </div>
        <section className="edit_inputs">
          {checkedIds.length === 1 ? (
            <div className="name_input">
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
          <div className="edit_tag_inputs">
            {checkedIds.length === 1 ? (
              <ul className="edit_tag_list">
                {itemTags.map((_, index) => (
                  <li className="edit_tag" key={`checkedTag${index}`}>
                    <span>태그{index + 1}</span>
                    <input
                      name="tag"
                      value={itemTags[index]}
                      onChange={(e) => handleTagInput(e, index)}
                    />
                    {index === 0 ? (
                      <button onClick={addTagBtn}>
                        <FontAwesomeIcon icon={faSquarePlus} />
                      </button>
                    ) : (
                      <button onClick={(e) => removeTagBtn(e, index)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : null}
            {validTag ? null : (
              <p className="edit_alert">⚠ 하나 이상의 태그가 필요합니다 ⚠</p>
            )}
            {checkedIds.length > 1 ? (
              <p className="edit_tag">
                <span>태그</span>
                <input type="text" name="newTag" onChange={handleNewTag} />
              </p>
            ) : null}
            {checkedIds.length > 0 ? (
              <button className="save_changes_btn" onClick={handleSaveBtn}>
                수정하기✨
              </button>
            ) : null}
          </div>
        </section>
        <ul className="checkbox_list">
          {list.map((bm, i) => (
            <li className="checkbox" key={`checkbox${i}`}>
              <input
                id={bm.id}
                type="checkbox"
                value={tagToAdd}
                onChange={handleCheckbox}
              />
              <span>이름 : {bm.name}</span>
              <span>{bm.tags.map((tag) => `# ${tag} `)}</span>
              <button
                className="delete_btn"
                onClick={(e) => removeBookmarkBtn(e, bm.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return { bookmarks: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addBookmarks: (data) => dispatch(addBookmarks(data)),
    removeBookmark: (data) => dispatch(removeBookmark(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
