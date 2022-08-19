const DB_NAME = 'BookmarkDB';
const OS_NAME = 'bookmarks';

// 1. indexedDB 객체 가져오기
const idxdDB = window.indexedDB;

// 2. 브라우저에서 지원하는지 체크하기
if (!idxdDB) window.alert('해당 브라우저에서는 indexedDB를 지원하지 않습니다.');
else {
  let db;
  const request = idxdDB.open(DB_NAME); // 3. SampleDB(db) 열기
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
export function writeDB(bookmarks) {
  // console.log(bookmarks);
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

// db의 모든 데이터 조회
export function getAllDBValues() {
  const result = [];
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
      if (cursor) {
        const value = objStore.get(cursor.key); // 3. 커서를 사용해 데이터 접근
        value.onsuccess = (e) => {
          // console.log(e.target.result);
          result.push(e.target.result);
        };
        cursor.continue(); // 4. cursor로 순회
      }
    };
  };

  // console.log(result);
  return result;
}

// 데이터 수정
export function updateDBValue(info, key, value) {
  const request = window.indexedDB.open(DB_NAME); // 1. db 열기
  request.onerror = (e) => console.log(e.target.errorCode);

  request.onsuccess = (e) => {
    const db = request.result;
    const transaction = db.transaction(OS_NAME, 'readwrite');
    transaction.onerror = (e) => console.log('fail');
    transaction.oncomplete = (e) => console.log('success');

    const objStore = transaction.objectStore(OS_NAME); // 2. name 저장소 접근
    const objStoreRequest = objStore.get(key); // 3. key값으로 데이터 접근
    objStoreRequest.onsuccess = (e) => {
      const data = objStoreRequest.result;
      switch (info) {
        case 'visit':
          data.visit += 1;
          break;
        case 'name':
          data.name = value;
          break;
        case 'tags':
          data.tags = value;
          break;
      }

      const updateRequest = objStore.put(data); // 4. 수정
      updateRequest.onerror = (e) => console.log('udpate error');
      updateRequest.onsuccess = (e) => console.log('success');
    };
  };
}
