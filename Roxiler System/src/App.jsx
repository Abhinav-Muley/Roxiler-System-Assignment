import React, { useState } from "react";
import Table from "./components/Table";
import Container from "./components/Container";
import Piechart from "./components/Piechart";
import { months } from "./data/Months";

function App() {
  const [query, setQuery] = useState({ month: 3, search: "" });
  const handleChange = (event) => {
    setQuery((prev) => {
      return { ...prev, month: event.target.value };
    });
  };
  const handleSearch = (event) => {
    setQuery((prev) => {
      return { ...prev, search: event.target.value };
    });
  };
  return (
    <div className="px-4">
      <Container>
        <p className="text-2xl font-medium mt-4">Transaction Table</p>

        <form className="mt-2 flex justify-between ">
          <select
            name=""
            id=""
            className="border-[#94A3B8] max-w-[90px] w-full border-[1px] rounded-md px-1 "
            onChange={handleChange}
            value={query.month}
          >
            {months.map((item, index) => (
              <option key={index} value={item.id}>
                {item.month}
              </option>
            ))}
          </select>
          <div className="max-w-[300px] w-full border-[#94A3BB] rounded-md flex items-center border-[1px]  px-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#8e8e8ed7] pl-0 p-1 box-content"
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.553 15.553a7.06 7.06 0 1 0-9.985-9.985a7.06 7.06 0 0 0 9.985 9.985m0 0L20 20"
              ></path>
            </svg>
            <input
              type="text"
              name=""
              id=""
              value={query.search}
              onChange={handleSearch}
              placeholder="Search for transaction"
              className="border-none outline-none font-medium text-[#0f0f0fd7] "
            />
          </div>
        </form>
        <Table month={query.month} search={query.search} />
        <Piechart month={query.month} />
      </Container>
    </div>
  );
}

export default App;
