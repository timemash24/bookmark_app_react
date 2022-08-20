import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { addBookmarks } from '../routes/store';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SortedBookmarks from '../components/SortedBookmarks';
import * as IndxdDBController from '../components/IndxdDBController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

function Home({ bookmarks, addBookmarks }) {
  const data = IndxdDBController.getAllDBValues();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagToEdit, setTagtoEdit] = useState('');
  const [editMode, setEditMode] = useState(false);

  const init = (data) => {
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
    getTags(sorted);
    setEditMode(false);
  };

  const onClick = (e) => {
    e.preventDefault();

    init(data);
  };

  useEffect(() => {
    addBookmarks(list);
  }, [list]);

  const getTags = (data) => {
    const set = new Set();
    data.forEach((item) => {
      item.tags.forEach((tag) => set.add(tag));
    });
    setTags([...set]);
    setSelectedTags(['all']);
  };

  const getTagToEdit = (e) => {
    setTagtoEdit(e.target.value);
  };

  const tagBtnHandler = (e) => {
    const tagName = e.target.innerText;
    if (editMode) {
      setSelectedTags([tagName]);
      setTagtoEdit(tagName);
    } else {
      let newSelectedTags = selectedTags;
      if (selectedTags.includes('all')) newSelectedTags = [];

      if (!newSelectedTags.includes(tagName)) {
        setSelectedTags([...newSelectedTags, tagName]);
      } else {
        const result = newSelectedTags.filter((tag) => tag !== tagName);
        setSelectedTags(result);
      }
    }
  };
  console.log(selectedTags);

  const handleEditBtn = (e) => {
    setEditMode(!editMode);
    setSelectedTags([]);
  };

  const saveChangesBtn = (e) => {
    // 선택한 태그 이름 수정
    bookmarks.forEach((bookmark) => {
      if (bookmark.tags.includes(selectedTags[0])) {
        const newTags = bookmark.tags.filter((tag) => tag !== selectedTags[0]);
        newTags.push(tagToEdit);
        IndxdDBController.updateDBValue('tags', bookmark.id, newTags);
      }
    });
    init(IndxdDBController.getAllDBValues());
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <section>
        <button onClick={onClick}>
          <FontAwesomeIcon icon={faBookOpen} />
        </button>
        {tags.map((tag, i) => (
          <button key={i} onClick={tagBtnHandler}>
            {tag}
          </button>
        ))}
      </section>
      <section>
        {list.length && !editMode ? (
          <button onClick={handleEditBtn}>태그 이름 수정하기🖋</button>
        ) : null}
        {editMode ? (
          <div>
            <input type="text" value={tagToEdit} onChange={getTagToEdit} />
            <button onClick={saveChangesBtn}>수정사항 저장✨</button>
          </div>
        ) : null}
      </section>
      <SortedBookmarks tags={selectedTags} data={list} />
    </div>
  );
}

function mapStateToProps(state) {
  return { bookmarks: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addBookmarks: (data) => dispatch(addBookmarks(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
