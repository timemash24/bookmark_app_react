import { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import * as IndxdDBController from '../components/IndxdDBController';
import { addBookmarks } from '../routes/store';

function SortedBookmarks({ tags, data }) {
  // const tmp = IndxdDBController.getAllDBValues();
  const [loading, setLoading] = useState(true);
  const [obj, setObj] = useState({});
  const [list, setList] = useState([]);
  // const result = JSON.parse(JSON.stringify(data));

  const getData = () => {
    // const result = JSON.parse(JSON.stringify(data));
    // for (let i = 0; i < data.length; i++) {
    //   console.log(data[i]);
    // }
    // console.log(Object.keys(data).length);
    // setObj(data);
    // const tmp = Object.values(data);
    // setLoading(false);
  };

  // useEffect(() => {
  //   // console.log(data);
  //   getData();
  //   // console.log(obj);
  // }, []);
  const onClick = (e) => {
    e.preventDefault();
    setList(data);
  };
  console.log(list);
  return (
    <section>
      <button onClick={onClick}>ALL</button>
      {list.map((item, i) => (
        <div key={i}>
          <a href={item.url} target="_blank">
            {item.name}
          </a>
        </div>
      ))}
    </section>
  );
}

function mapStateToProps(state) {
  return { bookmarks: state };
}

function mapDispatchToProps(dispatch) {
  return {
    addBookmark: (list) => dispatch(addBookmarks(list)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortedBookmarks);

// export default SortedBookmarks;
