import { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import * as IndxdDBController from '../components/IndxdDBController';
import { addBookmarks } from '../routes/store';

function SortedBookmarks({ tags, data }) {
  const [loading, setLoading] = useState(true);
  const [obj, setObj] = useState({});
  const [list, setList] = useState([]);

  // const onClick = (e) => {
  //   e.preventDefault();
  //   setList(data);
  // };

  const increaseVisit = (e) => {
    IndxdDBController.updateDBValue('visit', parseInt(e.target.id), 0);
  };

  return (
    <section>
      {data.map((item, i) => (
        <div key={i}>
          <a
            href={item.url}
            target="_blank"
            id={item.id}
            onClick={increaseVisit}
          >
            {item.name}
          </a>
        </div>
      ))}
    </section>
  );
}

// function mapStateToProps(state) {
//   return { bookmarks: state };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     add: (list) => dispatch(addBookmarks(list)),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SortedBookmarks);

export default SortedBookmarks;
