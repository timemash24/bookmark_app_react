import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarks = createSlice({
  name: 'bookmarksReducer',
  initialState: [],
  reducers: {
    addBookmarks: (state, action) => {
      // const { id, name, url, tags, visit } = action.payload;
      // state.push({
      //   id,
      //   name,
      //   url,
      //   tags,
      //   visit,
      //   // info: action.payload,
      // });
      console.log(action.payload);
      action.payload.forEach((i) => state.push(i));
    },
    removeBookmark: (state, action) => {
      state.filter((bookmark) => bookmark.id !== action.payload);
    },
    addTag: (state, action) => {
      const { id, tag } = action.payload;
      state.map((bookmark) => {
        if (bookmark.id === id) {
          bookmark.tags.push(tag);
        }
      });
    },
    removeTag: (state, action) => {
      const { id, tag } = action.payload;
      state.map((bookmark) => {
        if (bookmark.id === id) {
          bookmark.tags.filter((t) => t !== tag);
        }
      });
    },
    editName: (state, action) => {
      const { id, name } = action.payload;
      state.map((bookmark) => {
        if (bookmark.id === id) {
          bookmark.name = name;
        }
      });
    },
  },
});

export const { addBookmarks, removeBookmark, addTag, removeTag, editName } =
  bookmarks.actions;

export default configureStore({ reducer: bookmarks.reducer });
