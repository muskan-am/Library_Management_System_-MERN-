import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: [],
    },

    reducers: {
        fetchBooksRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },

        fetchBooksSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },

        fetchBooksFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        addBookRequest(state) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addBookSuccess(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        addBookFailed(state, action) {
            state.loading = false;
            state.books = action.payload;
        },
        resetBookSlice(state) {
            state.loading = false;
            state.error = null;
            state.message = null;
        },
    },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/book/all",
      { withCredentials: true }
    );

    dispatch(bookSlice.actions.fetchBooksSuccess(data.books));
  } catch (err) {
    dispatch(
      bookSlice.actions.fetchBooksFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());

  try {
    const { data: resData } = await axios.post(
      "http://localhost:4000/api/v1/book/admin/add",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(
      bookSlice.actions.addBookSuccess(resData.message)
    );
  } catch (err) {
    dispatch(
      bookSlice.actions.addBookFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};


export default bookSlice.reducer; 