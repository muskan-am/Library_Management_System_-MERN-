import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
    message: null,
  },

  reducers: {
    fetchUserBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUserBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchUserBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    recordBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    recordBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    resetBorrowSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});


// ✅ Async Actions (CLEAN VERSION)

// 👉 Get user borrowed books
export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/borrow/my-borrowed-books",
      { withCredentials: true }
    );

    dispatch(
      borrowSlice.actions.fetchUserBorrowedBooksSuccess(
        data.borrowedBooks
      )
    );
  } catch (err) {
    dispatch(
      borrowSlice.actions.fetchUserBorrowedBooksFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};


// 👉 Get all borrowed books (Admin)
export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());

  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/borrow/borrowed-books-by-users",
      { withCredentials: true }
    );

    dispatch(
      borrowSlice.actions.fetchAllBorrowedBooksSuccess(
        data.borrowedBooks
      )
    );
  } catch (err) {
    dispatch(
      borrowSlice.actions.fetchAllBorrowedBooksFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};


// 👉 Borrow book
export const recordBorrowBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBookRequest());

  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/borrow/record-borrow-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(
      borrowSlice.actions.recordBookSuccess(data.message)
    );
  } catch (err) {
    dispatch(
      borrowSlice.actions.recordBookFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};


// 👉 Return book
export const returnBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());

  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/borrow/return-borrowed-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(
      borrowSlice.actions.returnBookSuccess(data.message)
    );
  } catch (err) {
    dispatch(
      borrowSlice.actions.returnBookFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};


// 👉 Reset
export const resetBorrowSlice = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;