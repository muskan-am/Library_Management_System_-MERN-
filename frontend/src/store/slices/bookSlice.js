import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1";

const initialState = {
  loading: false,
  error: null,
  message: null,
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // 🔹 Fetch Books
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },

    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 Add Book
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 Delete Book
    deleteBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },

    deleteBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🔹 Reset
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

// ================== ACTIONS ==================
export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailed,
  addBookRequest,
  addBookSuccess,
  addBookFailed,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailed,
  resetBookSlice, // ✅ only once export
} = bookSlice.actions;

// ================== THUNKS ==================

// ✅ Fetch All Books
export const fetchAllBooks = () => async (dispatch) => {
  dispatch(fetchBooksRequest());

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/book/all`,
      {
        withCredentials: true,
      }
    );

    dispatch(fetchBooksSuccess(data?.books || []));
  } catch (error) {
    dispatch(
      fetchBooksFailed(
        error?.response?.data?.message || "Failed to fetch books"
      )
    );
  }
};

// ✅ Add Book
export const addBook = (formData) => async (dispatch) => {
  dispatch(addBookRequest());

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/book/admin/add`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(addBookSuccess(data?.message || "Book Added"));
    dispatch(toggleAddBookPopup());
  } catch (error) {
    dispatch(
      addBookFailed(
        error?.response?.data?.message || "Failed to add book"
      )
    );
  }
};

// ✅ Delete Book
export const deleteBookById = (bookId) => async (dispatch) => {
  dispatch(deleteBookRequest());

  try {
    const { data } = await axios.delete(
      `${API_BASE_URL}/book/delete/${bookId}`,
      {
        withCredentials: true,
      }
    );

    dispatch(deleteBookSuccess(data?.message || "Book deleted successfully"));
  } catch (error) {
    dispatch(
      deleteBookFailed(
        error?.response?.data?.message || "Failed to delete book"
      )
    );
  }
};

export default bookSlice.reducer;