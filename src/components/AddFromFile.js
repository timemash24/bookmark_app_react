import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as IndxdDBController from './IndxdDBController';
import { testFile } from './testFile';

const FOLDER_NAME_REGEX = /\"\>.*\<\/H3\>/g;
const BOOKMARK_NAME_REGEX = /\>.*\<\/A\>/g;
const URL_REGEX = /https?:\/\/.*\"/;

function AddFromFile() {
  const navigate = useNavigate();
  const [fileResult, setFileResult] = useState('');
  const [newBookmarks, setNewBookmarks] = useState([]);

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

      if (tmpFolder) {
        const folderName = getTextInTag(tmpFolder[0]);

        // 폴더 내 북마크 목록 구하기
        const dtArr = dl.split('<DT>');
        for (const dt of dtArr) {
          const tmpName = dt.match(BOOKMARK_NAME_REGEX);
          const id = Math.floor(Date.now() / Math.random());
          if (tmpName) {
            // 북마크 이름
            const name = getTextInTag(tmpName[0]);

            // 북마크 주소
            if (!dt.match(URL_REGEX)) continue;
            const tmpUrl = dt.match(URL_REGEX)[0].replace(/"/g, ' ');
            const url = tmpUrl.split(' ')[0];

            let info = {
              id: id,
              name: name,
              url: url,
              tags: [folderName],
              visit: 0,
            };

            bookmarksByFolder.push(info);
          }
        }
      }
    }
    setNewBookmarks(bookmarksByFolder);
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

  const onClick = () => {
    if (!newBookmarks.length) return;
    IndxdDBController.writeDB(newBookmarks);
    window.alert('성공적으로 추가되었습니다✍');
    navigate('/');
  };

  const exportTextFile = useCallback(() => {
    let fileName = 'bookmarks_test.html';
    let output = testFile;
    const element = document.createElement('a');
    const file = new Blob([output], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // FireFox
    element.click();
  }, []);

  return (
    <div>
      <form className="file_input" onSubmit={onSubmit}>
        <button className="testing" onClick={exportTextFile}>
          [ 테스트용 HTML 파일 다운받기 ]
        </button>
        <label>북마크 html 파일을 선택하세요</label>
        <input
          className="file_btn"
          type="file"
          accept=".html"
          onChange={onChange}
        />
        <div className="file_instruction">
          <p>⭐ Chrome에서 북마크를 HTML 파일로 가져오는 법 ⭐</p>
          <p>1. Chrome을 엽니다.</p>
          <p>2. 오른쪽 상단에서 더보기를 클릭합니다.</p>
          <p>3. 북마크 - 북마크 관리자를 선택합니다.</p>
          <p>4. 상단에서 더보기 - 북마크 내보내기를 클릭합니다.</p>
        </div>
        <input type="submit" value="추가" />
      </form>
      {/* <button className="testing" onClick={exportTextFile}>
        [ 테스트용 HTML 파일 다운받기 ]
      </button> */}

      <div>
        <button className="save_btn" onClick={onClick}>
          저장✨
        </button>
        <ul className="new_list">
          {newBookmarks.map((bookmark, i) => (
            <li className="new_bookmark" key={i}>
              <span>이름:{bookmark.name}</span>
              <span>url:{bookmark.url}</span>
              <span>
                태그:
                {bookmark.tags.map((tag, j) => (
                  <span key={`${i}${j}`}>#{tag}</span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddFromFile;
