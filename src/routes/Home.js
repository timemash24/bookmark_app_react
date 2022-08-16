import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Bookmark from '../components/Bookmark';

const DB_NAME = 'BookmarkDB';
const OS_NAME = 'bookmarks';

function Home() {
  const [DBstate, setDBstate] = useState(false);

  const sample = [
    {
      id: 1,
      name: 'bm1',
      url: 'https://www.blah.com',
      tags: ['tag1', 'tag2', 'tag3'],
      visit: 0,
    },
    {
      id: 2,
      name: 'bm2',
      url: 'https://www.ddd.com',
      tags: ['tag3', 'tag4'],
      visit: 0,
    },
    {
      id: 3,
      name: 'bm3',
      url: 'https://www.baaa.com',
      tags: ['tag1'],
      visit: 0,
    },
  ];

  // 1. indexedDB 객체 가져오기
  const idxedDB = window.indexedDB;

  // 2. 브라우저에서 지원하는지 체크하기
  if (!idxedDB)
    window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
  else {
    let db;
    const request = idxedDB.open(DB_NAME); // 3. SampleDB(db) 열기
    request.onupgradeneeded = (e) => {
      db = e.target.result;
      const objectStore = db.createObjectStore(OS_NAME, {
        keyPath: 'id',
      }); // 4. name저장소 만들고, key는 id로 지정

      request.onerror = (e) => alert('failed');
      request.onsuccess = (e) => (db = request.result); // 5. 성공시 db에 result를 저장
    };
  }

  // db에 데이터 저장
  function writeDB(bookmarks) {
    const request = window.indexedDB.open(DB_NAME);
    request.onerror = (e) => {
      alert('DataBase error', e.target.errorCode);
    };
    request.onsuccess = (e) => {
      const db = request.result;
      const transaction = db.transaction([OS_NAME], 'readwrite');
      //person 객체 저장소에 읽기&쓰기 권한으로 transaction 생성

      // 완료, 실패 이벤트 처리
      transaction.oncomplete = (e) => {
        console.log('write success');
      };
      transaction.onerror = (e) => {
        console.log('write fail');
      };

      // transaction으로
      const objStore = transaction.objectStore(OS_NAME);
      for (const bookmark of bookmarks) {
        const request = objStore.add(bookmark); // 저장
        request.onsuccess = (e) => console.log(e.target.result);
      }
    };
  }

  useEffect(() => {
    // db의 모든 데이터 조회
    const getAllDBValues = () => {
      const request = window.indexedDB.open(DB_NAME); // 1. DB 열기
      request.onerror = (e) => console.log(e.target.errorCode);

      request.onsuccess = (e) => {
        const db = request.result;
        const transaction = db.transaction(OS_NAME);
        transaction.onerror = (e) => console.log('fail');
        transaction.oncomplete = (e) => console.log('success');

        const objStore = transaction.objectStore(OS_NAME); // 2. name 저장소 접근
        const cursorRequest = objStore.openCursor();
        cursorRequest.onsuccess = (e) => {
          let cursor = e.target.result;
          console.log(cursor);
          if (cursor) {
            setDBstate(true);
            const value = objStore.get(cursor.key); // 3. 커서를 사용해 데이터 접근
            value.onsuccess = (e) => {
              console.log(e.target.result);
            };
            cursor.continue(); // 4. cursor로 순회
          } else {
            console.log('⚠ No Data in DB ⚠');
            return;
          }
        };
      };
    };
    getAllDBValues();
  }, []);

  const test = (e) => {
    e.preventDefault();
    writeDB(sample);
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        {DBstate ? (
          <h2>Data Exists</h2>
        ) : (
          <Link to={'/edit'}>
            <button>Go to Edit page</button>
          </Link>
        )}
      </div>

      <Bookmark />

      <section>
        <button onClick={test}>Add data</button>
      </section>
    </div>
  );
}

export default Home;
