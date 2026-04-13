import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecordBookPopup } from "./popUpSlice";

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
    // USER BORROWED BOOKS
    fetchUserBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
    },
    fetchUserBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RECORD BOOK
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

    // ALL BORROWED BOOKS (ADMIN)
    fetchAllBorrowedBooksRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllBorrowedBooksSuccess(state, action) {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
    },
    fetchAllBorrowedBooksFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RETURN BOOK
    returnBookRequest(state) {
      state.loading = true;
      state.error = null;
    },
    returnBookSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    returnBookFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // RESET
    resetBorrowSlice(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});


// ================== ASYNC ACTIONS ==================

// 👉 Get user borrowed books
export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());

  try {
    const { data } = await axios.get(
      "https://library-management-system-mern-9s8j.onrender.com/api/v1/borrow/my-borrowed-books",
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
      "https://library-management-system-mern-9s8j.onrender.com/api/v1/borrow/borrowed-books-by-users",
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


// 👉 Record Borrow Book (FIXED + AUTO REFRESH)
export const recordBorrowBook = (email, id) => async (dispatch) => {
  dispatch(borrowSlice.actions.recordBookRequest());

  try {
    const { data } = await axios.post(
      `https://library-management-system-mern-9s8j.onrender.com/api/v1/borrow/record-borrow-book/${id}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(borrowSlice.actions.recordBookSuccess(data.message));

    // 🔥 AUTO REFRESH AFTER SUCCESS
    dispatch(fetchAllBorrowedBooks());

    // 🔥 CLOSE POPUP
    dispatch(toggleRecordBookPopup());

  } catch (err) {
    dispatch(
      borrowSlice.actions.recordBookFailed(
        err.response?.data?.message || "Something went wrong"
      )
    );
  }
};


// 👉 Return Book (ALSO AUTO REFRESH)
export const returnBook = ({ email, bookId }) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBookRequest());

  try {
    const { data } = await axios.put(
      `https://library-management-system-mern-9s8j.onrender.com/api/v1/borrow/return-borrowed-book/${bookId}`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(
      borrowSlice.actions.returnBookSuccess(data.message)
    );

    // 🔥 AUTO REFRESH
    dispatch(fetchAllBorrowedBooks());

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