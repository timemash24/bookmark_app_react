import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { addBookmarks } from '../routes/store';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SortedBookmarks from '../components/SortedBookmarks';
import * as IndxdDBController from '../components/IndxdDBController';

const tmp = IndxdDBController.getAllDBValues();

function Home({ bookmarks, addBookmarks }) {
  const [list, setList] = useState([]);

  const onClick = (e) => {
    e.preventDefault();
    setList(tmp);
  };

  const test = (e) => {
    e.preventDefault();
    addBookmarks(list);
  };

  console.log(bookmarks);
  return (
    <div>
      <Navbar />
      <button onClick={onClick}>ALL</button>
      <SortedBookmarks tags={['웹개발']} data={list} />
      <button onClick={test}>store test</button>
    </div>
  );
}

function mapStateToProps(state) {
  return { bookmarks: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addBookmarks: (tmp) => dispatch(addBookmarks(tmp)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
