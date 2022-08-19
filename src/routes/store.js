import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarks = createSlice({
  name: 'bookmarks',
  initialState: [],
  reducers: {
    addBookmarks: (state, action) => {
      console.log(action.payload);
      // state.push(...action.payload);
      return [...action.payload];
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
