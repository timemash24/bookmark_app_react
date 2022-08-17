import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Edit() {
  const sample = [
    {
      id: 1,
      name: 'bm1',
      url: 'https://google.com/',
      tags: ['tag1', 'tag2', 'tag3'],
      visit: 0,
    },
    {
      id: 2,
      name: 'bm2',
      url: 'https://naver.com/',
      tags: ['tag3', 'tag4'],
      visit: 0,
    },
    { id: 3, name: 'bm3', url: 'https://aaaa.com/', tags: ['tag1'], visit: 0 },
  ];

  const [checkedItems, setCheckedItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemTag, setItemTag] = useState('');
  const [bChecked, setChecked] = useState(false);

  const checkedItemHandler = (target) => {
    const id = parseInt(target.id);

    if (checkedItems.includes(id)) {
      if (checkedItems.length > 1)
        setItemName(sample.find((bm) => bm.id === checkedItems[0]).name);
      else setItemName('');
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    } else {
      console.log('add id');
      setCheckedItems([...checkedItems, id]);
      setItemName(sample.find((bm) => bm.id === id).name);
    }
  };

  const checkHandler = ({ target }) => {
    const id = parseInt(target.id);

    if (checkedItems.includes(id)) {
      if (checkedItems.length > 1)
        setItemName(sample.find((bm) => bm.id === checkedItems[0]).name);
      else setItemName('');
      setCheckedItems(checkedItems.filter((itemId) => itemId !== id));
    } else {
      console.log('add id');
      setCheckedItems([...checkedItems, id]);
      setItemName(sample.find((bm) => bm.id === id).name);
    }
  };

  const nameInputHandler = ({ target }) => {
    setItemName(target.value);
  };

  const tagInputHandler = ({ target }) => {
    setItemTag(target.value);
  };

  console.log(checkedItems);
  return (
    <div>
      <Navbar />
      <form>
        <section>
          <p>
            <label htmlFor="name">이름</label>
            {checkedItems.length <= 1 ? (
              <input
                type="text"
                name="name"
                value={itemName}
                onChange={nameInputHandler}
                disabled={checkedItems.length ? false : true}
              />
            ) : null}
          </p>
          <div>
            <label htmlFor="tags">태그</label>
            {sample.map((bm, i) =>
              checkedItems.length === 1 && bm.id === checkedItems[0] ? (
                <p key={`checked${i}`}>
                  {bm.tags.map((tag, j) => (
                    <input
                      key={`checkedTag${j}`}
                      name="tag"
                      value={tag}
                      onChange={tagInputHandler}
                    />
                  ))}
                </p>
              ) : null
            )}
            {checkedItems.length > 1 ? <input type="text" name="tags" /> : null}
            <button>수정하기</button>
          </div>
        </section>
        <section>
          {sample.map((bm, i) => (
            <div key={`checkbox${i}`}>
              <input id={bm.id} type="checkbox" onChange={checkHandler} />
              <span>이름 : {bm.name}</span>
              <span>태그 : {bm.tags.map((tag) => `# ${tag} `)}</span>
            </div>
          ))}
        </section>
      </form>
    </div>
  );
}

export default Edit;
