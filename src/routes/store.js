import { configureStore, createSlice } from '@reduxjs/toolkit';

const bookmarks = createSlice({
  name: 'bookmarks',
  initialState: [],
  reducers: {
    addBookmarks: (state, action) => {
      console.log(action.payload);
      return [...action.payload];
    },
    removeBookmark: (state, action) => {
      state.filter((bookmark) => bookmark.id !== action.payload);
    },
  },
});

export const { addBookmarks, removeBookmark } = bookmarks.actions;

export default configureStore({ reducer: bookmarks.reducer });
