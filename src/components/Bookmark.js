function Bookmark({ name, url }) {
  return (
    <div>
      <a href={url} target="_blank">
        {name}
      </a>
    </div>
  );
}

export default Bookmark;
