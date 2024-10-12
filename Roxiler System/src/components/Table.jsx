import React, { useEffect, useMemo, useState } from "react";
import { months } from "../data/Months";
import axios from "axios";
function Table({ month, search }) {
  // const query = {month, search}
  // const [query, setQuery] = useState({ month: month, search: search });
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
    <>
      {/* <p className="mt-2 font-medium">Total Records: {records}</p> */}
      <table className="w-full mt-2  bg-slate-400 rounded-lg  ">
        <thead>
          <tr className="">
            <td className=" font-medium py-2 px-3">Id</td>
            <td className=" font-medium py-2 px-3">Title</td>
            <td className=" font-medium py-2 px-3">Description</td>
            <td className=" font-medium py-2 px-3">Price</td>
            <td className=" font-medium py-2 px-3">Category</td>
            <td className=" font-medium py-2 px-3">Sold</td>
            <td className=" font-medium py-2 px-3">Image</td>
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
                <img src={item.image} width={"40px"} height={"40px"} alt="" />
                {/* {item.image} */}
              </td>
              {/* <td>{item.dateOfSale}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center my-2 font-medium">
        <p>Page No: {page}</p>
        <div className="flex items-center gap-2">
          <button
            className="border-[#94A3BB] flex gap-1 items-center rounded-md border-[1px] p-2"
            onClick={handlePreviousPage}
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
          <p>-</p>
          <button
            className="border-[#94A3BB] flex gap-1 items-center rounded-md border-[1px] p-2"
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
        <p className="">Per Page: {10}</p>
      </div>
    </>
  );
}

export default Table;
