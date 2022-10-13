# Bookmark App 
태그를 이용하여 정리된 북마크 목록을 보여주는 앱 🏷

## 사용 스택
React.js, Javascript, Redux, HTML, CSS

> 크롬의 북마크바는 폴더식으로 구분되어 특정 북마크를 찾는데 조금 불편했다.
점점 불어나는 북마크 목록에서 찾고 싶은 북마크를 쉽게 찾고 싶어서 제작하게 되었다.
폴더 안에 수많은 북마크 목록을 살펴보고 폴더 속의 폴더 속의 북마크를 힘들게 찾지 않고
북마크에 원하는 태그를 여러개 붙여서 선택한 태그별로 북마크를 볼 수 있다.

Demo Site 🔗 https://timemash24.github.io/bookmark_app_react/

![bookmark_app_page](https://user-images.githubusercontent.com/56548122/185840504-c105f9a9-611e-40c4-aba8-c1a8dc0013dd.PNG)
![image](https://user-images.githubusercontent.com/56548122/186594448-f41d07f8-d8c6-4058-bd96-c0bf0bd4196e.png)
![image](https://user-images.githubusercontent.com/56548122/186594517-01585fde-2702-44e1-99ae-b38a5f02cd20.png)
![image](https://user-images.githubusercontent.com/56548122/186597236-eca4d8e6-e10b-45fc-8411-ef9e4831cd76.png)

## 기능 설명
- 브라우저 재시작 시에도 저장된 북마크 불러오기
  - IndexedDB에 북마크 이름, url, 태그, 방문 횟수 저장하여 사용 
  - IndexedDB는 DOM 이벤트 리스너로 요청을 할 수 있기 때문에 더 원활한 활용을 위해 redux 사용으로 bookmark 정보를 state으로 활용

- 선택한 태그를 모두 포함하는 북마크 표시
  - 추가한 북마크 목록에 존재하는 모든 태그 목록 표시
  - 선택한 태그 다시 클릭 시 제외
  - 태그 이름 수정
  - 방문 횟수 순 다음 사전 순으로 정렬하여 표시

- 북마크 추가 & 수정
  - 북마크 개별 추가 
    - 이름, url, 태그를 입력하여 개별 북마크 추가
  - 북마크 HTML 파일에서 북마크 일괄 추가
    - 크롬의 북마크 설정에서 내보낸 HTML 파일을 업로드 시 북마크 목록으로 변환
    - 정규표현식 활용으로 북마크 이름, url, 폴더명을 찾고 폴더명은  추가
  - 북마크 수정
    - Checkbox로 선택한 북마크 하나일 경우 이름과 태그 수정 
    - Checkbox로 선택한 북마크 두 개 이상일 경우 태그 일괄 추가
