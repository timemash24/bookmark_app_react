function Bookmark() {
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

  return (
    <section>
      {sample.map((bookmark, i) => (
        <div key={`bm${i}`}>
          <a href={bookmark.url} target="_blank">
            {bookmark.name}
          </a>
        </div>
      ))}
    </section>
  );
}

export default Bookmark;
