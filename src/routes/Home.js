import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SortedBookmarks from '../components/SortedBookmarks';
import * as IndxdDBController from '../components/IndxdDBController';

const DB_NAME = 'BookmarkDB';
const OS_NAME = 'bookmarks';
const tmp = IndxdDBController.getAllDBValues();

function Home() {
  const [list, setList] = useState([]);
  const main = useRef();

  return (
    <div ref={main}>
      <Navbar />
      <SortedBookmarks tags={['웹개발']} data={tmp} />
    </div>
  );
}

// function mapStateToProps(state) {
//   return {bookmarks:state}
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     addBookmark: ()
//   }
// }
// export default connect(mapStateToProps)(mapDispatchToProps)(Home);
export default Home;
