import { faBookOpen, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import * as IndxdDBController from '../components/IndxdDBController';
import Navbar from '../components/Navbar';
import SortedBookmarks from '../components/SortedBookmarks';
import { addBookmarks } from '../routes/store';
import '../css/Home.css';

function Home({ bookmarks, addBookmarks }) {
  const data = IndxdDBController.getAllDBValues();
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);
  const [empty, setEmpty] = useState(false);
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
    init(data);
    if (!data.length) setEmpty(true);
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
      if (selectedTags.includes('all')) {
        newSelectedTags = [];
      }

      if (!newSelectedTags.includes(tagName)) {
        setSelectedTags([...newSelectedTags, tagName]);
      } else {
        const result = newSelectedTags.filter((tag) => tag !== tagName);
        setSelectedTags(result);
      }
    }
  };

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
    setTagtoEdit('');
    window.alert('수정이 완료되었습니다😊');
    init(IndxdDBController.getAllDBValues());
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      <main className="main">
        <section className="tags">
          <button onClick={onClick}>
            <FontAwesomeIcon icon={faBookOpen} />
          </button>
          {empty ? (
            <div className="empty">북마크를 추가해 주세요 📚</div>
          ) : null}
          {tags.map((tag, i) =>
            selectedTags.includes(tag) ? (
              <button className="tag_selected" key={i} onClick={tagBtnHandler}>
                {tag}
              </button>
            ) : (
              <button className="tag_excluded" key={i} onClick={tagBtnHandler}>
                {tag}
              </button>
            )
          )}
        </section>
        <section className="tag_edit">
          {list.length && !editMode ? (
            <button onClick={handleEditBtn}>
              <FontAwesomeIcon icon={faPen} />
              <span>태그 이름 수정하기</span>
              <FontAwesomeIcon icon={faPen} />
            </button>
          ) : null}
          {editMode ? (
            <div>
              <input type="text" value={tagToEdit} onChange={getTagToEdit} />
              <button onClick={saveChangesBtn}>
                <span>수정사항 저장✨</span>
              </button>
            </div>
          ) : null}
        </section>
        <SortedBookmarks tags={selectedTags} data={list} />
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
