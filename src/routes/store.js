import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarks = createSlice({
  name: 'bookmarksReducer',
  initialState: [],
  reducers: {
    addBookmark: (state, action) => {
      const { name, url, tags } = action.payload;
      state.push({
        id: Date.now(),
        visit: 0,
        name,
        url,
        tags,
        // info: action.payload,
      });
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

export const { addBookmark, removeBookmark, addTag, removeTag, editName } =
  bookmarks.actions;

export default configureStore({ reducer: bookmarks.reducer });
