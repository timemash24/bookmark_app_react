import { useEffect, useState } from 'react';
import * as IndxdDBController from '../components/IndxdDBController';

function SortedBookmarks({ tags, data }) {
  const [selectedList, setSelectedList] = useState([]);

  const getSelectedList = () => {
    if (tags.includes('all')) {
      setSelectedList([...data]);
    } else {
      const set = new Set();
      const result = [];

      if (tags.length > 1) {
        for (const bookmark of data) {
          let include = false;
          for (const tag of tags) {
            if (bookmark.tags.includes(tag)) include = true;
            else {
              include = false;
              break;
            }
          }
          if (include) result.push(bookmark);
        }
        setSelectedList(result);
      } else {
        for (const tag of tags) {
          for (const bookmark of data) {
            if (bookmark.tags.includes(tag)) result.push(bookmark);
          }
        }
        setSelectedList(result);
      }
    }
  };

  useEffect(() => {
    // console.log(tags, data);
    getSelectedList();
  }, [tags]);

  const increaseVisit = (e) => {
    IndxdDBController.updateDBValue('visit', parseInt(e.target.id), 0);
  };

  return (
    <ul className="bookmark_list">
      {selectedList.map((item, i) => (
        <li className="bookmark" key={i}>
          <a
            href={item.url}
            target="_blank"
            id={item.id}
            onClick={increaseVisit}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SortedBookmarks;
