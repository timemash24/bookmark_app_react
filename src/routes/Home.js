import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { addBookmarks } from '../routes/store';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SortedBookmarks from '../components/SortedBookmarks';
import * as IndxdDBController from '../components/IndxdDBController';

function Home({ bookmarks, addBookmarks }) {
  const data = IndxdDBController.getAllDBValues();
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagSorts, setTagSorts] = useState([]);

  const onClick = (e) => {
    e.preventDefault();

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
  };

  useEffect(() => {
    addBookmarks(list);
  }, [list]);

  const getTags = (list) => {
    const set = new Set();
    list.forEach((item) => {
      item.tags.forEach((tag) => set.add(tag));
    });
    setTags([...set]);
    setTagSorts(['all']);
  };

  const tagBtnHandler = (e) => {
    let newTagSorts = tagSorts;
    if (tagSorts.includes('all')) newTagSorts = [];
    const tagName = e.target.innerText;
    if (!newTagSorts.includes(tagName)) {
      setTagSorts([...newTagSorts, tagName]);
    } else {
      const result = newTagSorts.filter((tag) => tag !== tagName);
      setTagSorts(result);
    }
  };

  return (
    <div>
      <Navbar />
      <button onClick={onClick}>ALL</button>
      {tags.map((tag, i) => (
        <button key={i} onClick={tagBtnHandler}>
          {tag}
        </button>
      ))}
      <SortedBookmarks tags={tagSorts} data={list} />
      {/* <button onClick={test}>store test</button> */}
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
// export default Home;
