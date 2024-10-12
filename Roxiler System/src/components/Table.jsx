import React, { useEffect, useMemo, useState } from "react";
import { months } from "../data/Months";
import axios from "axios";

function Table({ month, search }) {
  const [tableData, setTableData] = useState([]);
  const [page, setPageNo] = useState(1);
  const [records, setRecords] = useState(1);
  const query = useMemo(() => {
    return { month, search, page };
  }, [month, search]);

  useEffect(() => {
    const apiCall = async () => {
      const data = await axios.get("http://localhost:3000/", { params: query });
      console.log(data);
      setPageNo(data.data.currentPage);
      setRecords(data.data.totalRecords);
      setTableData(data.data.data);
    };
    apiCall();
  }, [query]);

  const handleNextPage = async () => {
    const data = await axios.get("http://localhost:3000/", {
      params: { ...query, page: page + 1 },
    });
    console.log(data);
    setPageNo(data.data.currentPage);
    setRecords(data.data.totalRecords);
    setTableData(data.data.data);
  };

  const handlePreviousPage = async () => {
    const data = await axios.get("http://localhost:3000/", {
      params: { ...query, page: page - 1 },
    });
    console.log(data);
    setPageNo(data.data.currentPage);
    setRecords(data.data.totalRecords);
    setTableData(data.data.data);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-2">
      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-400 rounded-lg text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="font-medium py-2 px-3">Id</th>
              <th className="font-medium py-2 px-3">Title</th>
              <th className="font-medium py-2 px-3">Description</th>
              <th className="font-medium py-2 px-3">Price</th>
              <th className="font-medium py-2 px-3">Category</th>
              <th className="font-medium py-2 px-3">Sold</th>
              <th className="font-medium py-2 px-3">Image</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id} className="bg-slate-100">
                <td className="py-2 px-3">{item.id}</td>
                <td className="py-2 px-3">{item.title}</td>
                <td className="py-2 px-3">{item.description}</td>
                <td className="py-2 px-3">{item.price}</td>
                <td className="py-2 px-3">{item.category}</td>
                <td className="py-2 px-3">{item.sold ? "Yes" : "No"}</td>
                <td className="py-2 px-3">
                  <img src={item.image} className="w-10 h-10" alt="Product" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center my-4 space-y-2 md:space-y-0">
        <p className="text-sm md:text-base">Page No: {page}</p>
        <div className="flex items-center gap-2">
          <button
            className="border-[#94A3BB] flex gap-1 items-center rounded-md border-[1px] p-2 text-sm md:text-base"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#636B74"
                strokeWidth={2}
                d="m15 6l-6 6l6 6"
              ></path>
            </svg>
            Previous
          </button>
          <p className="text-sm md:text-base">-</p>
          <button
            className="border-[#94A3BB] flex gap-1 items-center rounded-md border-[1px] p-2 text-sm md:text-base"
            onClick={handleNextPage}
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-[2.5px]"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#636B74"
                strokeWidth={2}
                d="m9 6l6 6l-6 6"
              ></path>
            </svg>
          </button>
        </div>
        <p className="text-sm md:text-base">Per Page: 10</p>
      </div>
    </div>
  );
}

export default Table;
