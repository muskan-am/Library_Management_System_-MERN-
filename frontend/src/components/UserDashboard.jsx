import React, { useEffect, useState } from "react";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Header from "../layout/Header";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { settingPopup } = useSelector((state) => state.popup);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    const borrowed = userBorrowedBooks.filter((b) => !b.returned);
    const returned = userBorrowedBooks.filter((b) => b.returned);

    setTotalBorrowedBooks(borrowed.length);
    setTotalReturnedBooks(returned.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#3D3E3E", "#151619"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-28">
        <Header/>
        <div className="flex flex-col-reverse xl:flex-row">
          {/* LEFT SIDE */}
          <div className="flex flex-[4] flex-col gap-7 lg:gap-7 lg:py-5 justify-between xl:min-h-[85.5vh]">
            <div className="flex flex-col gap-7 flex-[4]">
                <div className="flex flex-col lg:flow-root gap-7 overflow-y-hidden">
                    <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden
                    rounded-lg transition hover:shadow-inner duration-300">
                      <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                      <span className="bg-gray-300 h-20 lg:h-full"><img src={bookIcon} alt="book-icon"  className="w-8 h-8"/></span>
                      <p className="text-lg xl:text-xl font-semibold">Your Borrowed Book List</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden
                    rounded-lg transition hover:shadow-inner duration-300">
                      <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                      <span className="bg-gray-300 h-20 lg:h-full"><img src={returnIcon} alt="book-icon"  className="w-8 h-8"/></span>
                      <p className="text-lg xl:text-xl font-semibold">Your Returned Book List</p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-7">
                    <div className="flex items-center gap-3 bg-white p-5 min-h-[120px] overflow-y-hidden
                    rounded-lg transition hover:shadow-inner duration-300">
                      <span className="w-[2px] bg-black h-20 lg:h-full"></span>
                      <span className="bg-gray-300 h-20 lg:h-full">
                        <img src={browseIcon} alt="book-icon"  className="w-8 h-8"/>
                        </span>
                      <p className="text-lg xl:text-xl font-semibold">
                        Let's browse books inventory
                      </p>
                    </div>
                    <img src={logo_with_title} alt="logo" className="hidden lg:block w-auto justify-end" />
                </div>
            </div>
          </div>
          {/* RIGHT SIDE */}
        </div>
      </main>
    </>
  );
};

export default UserDashboard;