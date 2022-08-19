import { useEffect, useState } from 'react';
import { connect } from 'react-redux/es/exports';
import * as IndxdDBController from '../components/IndxdDBController';
import { addBookmarks } from '../routes/store';

function SortedBookmarks({ tags, data }) {
  const [loading, setLoading] = useState(true);
  const [obj, setObj] = useState({});
  const [selectedList, setSelectedList] = useState([]);

  // const onClick = (e) => {
  //   e.preventDefault();
  //   setList(data);
  // };
  console.log(tags);
  const getSelectedList = () => {
    if (tags.includes('all')) {
      setSelectedList([...data]);
    } else {
      const set = new Set();
      for (const tag of tags) {
        for (const bookmark of data) {
          if (bookmark.tags.includes(tag)) set.add(bookmark);
        }
      }
      setSelectedList([...set]);
    }
  };

  useEffect(() => {
    console.log(tags, data);
    getSelectedList();
  }, [tags]);

  const increaseVisit = (e) => {
    IndxdDBController.updateDBValue('visit', parseInt(e.target.id), 0);
  };

  return (
    <section>
      {selectedList.map((item, i) => (
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

export default SortedBookmarks;
