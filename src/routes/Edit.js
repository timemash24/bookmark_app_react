import { useState } from 'react';

const FOLDER_NAME_REGEX = /\"\>.*\<\/H3\>/g;
const BOOKMARK_NAME_REGEX = /\>.*\<\/A\>/g;
const URL_REGEX = /https?:\/\/[\w\-\.]+/g;

function Edit() {
  const [fileResult, setFileResult] = useState('');
  const [newBookmarkList, setNewBookmarkList] = useState([]);

  const getTextInTag = (text) => {
    const result = text.substring(text.indexOf('>') + 1, text.indexOf('<'));

    return result;
  };

  const getBookmarkInfo = (text) => {
    // 북마크 폴더명 찾기
    const dlArr = text.split('<H3');

    let bookmarksByFolder = [];

    for (const dl of dlArr) {
      const tmpFolder = dl.match(FOLDER_NAME_REGEX);
      let info = [];

      if (tmpFolder) {
        const folderName = getTextInTag(tmpFolder[0]);
        info.push(folderName);

        // 폴더 내 북마크 목록 구하기
        const dtArr = dl.split('<DT>');
        for (const dt of dtArr) {
          const tmpName = dt.match(BOOKMARK_NAME_REGEX);
          if (tmpName) {
            // 북마크 이름
            const name = getTextInTag(tmpName[0]);
            // console.log(name);

            // 북마크 주소
            const url = dt.match(URL_REGEX)[0];
            // console.log(url);

            info.push([name, url]);
          }
        }

        bookmarksByFolder.push(info);
      }
    }
    setNewBookmarkList(bookmarksByFolder);
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setFileResult(fileReader.result);
    };
    fileReader.readAsText(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getBookmarkInfo(fileResult);
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log(newBookmarkList);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>북마크 html 파일을 선택하세요</label>
        <input type="file" accept=".html" onChange={onChange} />
        <input type="submit" value="추가✨" />
      </form>
      <button onClick={onClick}>테스트</button>
      <div>
        {newBookmarkList.map((folder, i) => (
          <h3 key={`folder${i}`}>{folder[0]}</h3>
        ))}
        <ul>
          {newBookmarkList.map((folder) =>
            folder.map((bookmark, i) =>
              i !== 0 ? (
                <li key={`newBookmark${i}`}>
                  <a href={bookmark[1]} key={`newBookmarkI${i}`}>
                    {bookmark[0]}
                  </a>
                </li>
              ) : null
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Edit;
