import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  filteredPosts: [],
  pagePosts: [],
  pageNumber: 1,
  pages: 0,
  pager: [],
  loading: true,
  error: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const posts = action.payload;
      const pages = Math.ceil(posts.length / 10);
      state.posts = posts;
      state.filteredPosts = posts;
      state.pages = pages;
      state.pagePosts = posts.slice(0, 10);
      state.loading = false;
      state.pager =
        pages > 5
          ? [1, 2, 3, 4, 5]
          : [...Array(pages)].map((e, index) => index + 1);
    },
    getPage: (state, action) => {
      if (action.payload > state.pages) {
        state.pageNumber = state.pages;
      } else {
        state.pageNumber = action.payload;
      }
      state.pagePosts = state.filteredPosts.slice(
        (state.pageNumber - 1) * 10,
        (state.pageNumber - 1) * 10 + 10
      );
    },
    getNextPage: (state) => {
      state.pageNumber = state.pageNumber + 1;
      if (state.pageNumber > state.pager[state.pager.length - 1]) {
        state.pager.shift();
        state.pager.push(state.pageNumber);
      }
      state.pagePosts = state.filteredPosts.slice(
        (state.pageNumber - 1) * 10,
        (state.pageNumber - 1) * 10 + 10
      );
    },
    getPrevPage: (state) => {
      state.pageNumber = state.pageNumber - 1;
      if (state.pageNumber < state.pager[0]) {
        state.pager.pop();
        state.pager.unshift(state.pageNumber);
      }
      state.pagePosts = state.filteredPosts.slice(
        (state.pageNumber - 1) * 10,
        (state.pageNumber - 1) * 10 + 10
      );
    },

    sortPosts(state, action) {
      const payload = action.payload;
      if (!payload.ascending) {
        state.filteredPosts = state.filteredPosts.sort(function (a, b) {
          if (a[payload.field] < b[payload.field]) return -1;
          if (a[payload.field] > b[payload.field]) return 1;
        });
      } else {
        state.filteredPosts = state.filteredPosts
          .sort(function (a, b) {
            if (a[payload.field] < b[payload.field]) return -1;
            if (a[payload.field] > b[payload.field]) return 1;
          })
          .reverse();
      }

      state.pagePosts = state.filteredPosts.slice(
        (state.pageNumber - 1) * 10,
        (state.pageNumber - 1) * 10 + 10
      );
    },

    searchInPosts(state, action) {
      if (action.payload === "") {
        state.filteredPosts = state.posts;
      } else {
        state.filteredPosts = state.posts.filter(function (post) {
          if (
            post.id
              .toString()
              .includes(action.payload.toString().toLowerCase()) ||
            post.title
              .toString()
              .toLowerCase()
              .includes(action.payload.toString().toLowerCase()) ||
            post.body
              .toString()
              .toLowerCase()
              .includes(action.payload.toString().toLowerCase())
          )
            return post;
        });
      }

      const pages = Math.ceil(state.filteredPosts.length / 10);
      state.pageNumber = 1;
      state.pages = pages;
      state.pager =
        pages > 5
          ? [1, 2, 3, 4, 5]
          : [...Array(pages)].map((e, index) => index + 1);

      state.pagePosts = state.filteredPosts.slice(
        (state.pageNumber - 1) * 10,
        (state.pageNumber - 1) * 10 + 10
      );
    },

    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  getPage,
  getNextPage,
  getPrevPage,
  sortPosts,
  searchInPosts,
  setError,
} = postSlice.actions;

export default postSlice.reducer;
