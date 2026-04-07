import React, { useState } from "react";
import { BookA } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import Header from "../layout/Header";


const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books?.find((book) => book._id === id);
    if (!book) return;

    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getFullYear())}`;

    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

    return `${formattedDate} ${formattedTime}`;
  };

  const [filter, setFilter] = useState("returned");

  const returnedBooks = userBorrowedBooks?.filter((book) => {
    return book.returned === true;
  });

  const nonReturnedBooks = userBorrowedBooks?.filter((book) => {
    return book.returned === false;
  });

  const booksToDisplay = 
    filter === "returned" ? returnedBooks : nonReturnedBooks;

  return <>
    <main className="relative flex-1 p-6 pt-28">
      <Header/>

      {/* Sub Header */}
      <header className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
         <h2 className="text-xl font-medium md:text-2xl md:font-semibold">Borrowed Books</h2>
      </header>
    </main>
  
  </>;
};

export default MyBorrowedBooks;
