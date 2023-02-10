import { useMemo, useState } from "react";
import { UseGetUser } from "../api/getUser";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
export interface UserTableProps {}

export default function UserTable(props: UserTableProps) {

  let PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "1";
  let [listUser] = UseGetUser(`/?results=100&page=${[page]}`);


  //Handle search input
  const [searchInput, setSearchInput] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const filteredData = useMemo(() => {
    if (searchInput.length === 0) {
      return listUser;
    } else {
      return listUser.filter((data) => {
        return (
          data.name.last.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.email.toLowerCase().includes(searchInput.toLowerCase()) ||
          data.name.first.toLowerCase().includes(searchInput.toLowerCase())
        );
      });
    }
  }, [listUser, searchInput]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  //Handle sorting name to alphabet

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (sortOrder: "asc" | "desc") => {
    setSortOrder(sortOrder);
  };

  let dataSorting = currentTableData;
  if (sortOrder === "asc") {
    dataSorting = currentTableData.sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
      return 0;
    });
  } else if (sortOrder === "desc") {
    dataSorting = currentTableData.sort((a, b) => {
      if (a.name.first > b.name.first) {
        return -1;
      }
      if (a.name.first < b.name.first) {
        return 1;
      }
      return 0;
    });
  }
  dataSorting = currentTableData;
  
  //Change json to locate date
  function changeDate(date: string) {
    let date1;
    return (date1 = new Date(date).toLocaleDateString());
  }

  return (
    <div className="lg:container lg:mx-auto mx-auto ">
      <h1 className="text-5xl text-center font-medium py-9">
        User App for assignment details
      </h1>
      <div className="flex flex-col justify-between mx-24">
        <div className="flex flex-row justify-between mb-5">
          <div>
            <label className="relative block">
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
              <input
                className="placeholder:italic placeholder:text-slate-400  block bg-white border border-slate-300 rounded-md py-2 pl-5 pr-24 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-md"
                placeholder="Search by username, id,..."
                type="text"
                name="search"
                onChange={handleChange}
                value={searchInput}
              />
            </label>
          </div>
          <div>
            {" "}
            <button className="px-6 py-2 text-white rounded-md bg-green1 text-lg">
              New User
            </button>
          </div>
        </div>
        <div>
          <table className="border-collapse border w-full table-auto sm:table sm:table-fixed sm:w-full border-slate-400">
            <thead className="h-10 mx-auto">
              <tr className="bg-tablebg ">
                <th className="border border-slate-400 text-lg font-semibold text-center w-1/12 sm:w-1/12">
                  ID
                </th>
                <th className="border border-slate-400 text-lg font-semibold  text-start px-2 w-3/12 sm:3/12">
                  Full Name
                  <button onClick={() => handleSort("asc")}>▲</button>
                  <button onClick={() => handleSort("desc")}>▼</button>
                </th>
                <th className="border border-slate-400 text-lg font-semibold  text-start px-2 w-2/12 sm:w-2/12">
                  City
                </th>
                <th className="border border-slate-400 text-lg font-semibold  text-start px-2 w-1/12 sm:w-1/12">
                  Gender
                </th>
                <th className="border border-slate-400 text-lg font-semibold  text-start px-2 w-2/12 sm:w-2/12">
                  DOB
                </th>
                <th className="border border-slate-400 text-lg font-semibold  text-start px-2 w-3/12 sm:w-3/12">
                  Email
                </th>
                <th className="border border-slate-400 text-lg font-semibold  text-start px-2 w-1/12 sm:w-1/12 sm:overflow-hidden">
                  Thumbnail
                </th>
              </tr>
            </thead>

            <tbody className="h-14 mx-auto">
              {dataSorting.map((item, index) => (
                <tr key={index} className="sm:table-row">
                  <td className="border border-slate-300 text-lg text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 text-lg text-start px-2 sm:w-full">
                    {item.name.title} {item.name.first} {item.name.last}
                  </td>
                  <td className="border border-slate-300 text-lg text-start px-2 sm:w-full">
                    {item.location.city}
                  </td>

                  <td className="border border-slate-300 text-lg text-start px-2 sm:w-full ">
                    <div className="sm:overflow-hidden truncate">
                      {item.gender}
                    </div>
                  </td>
                  <td className="border border-slate-300 text-lg text-start px-2 sm:w-full">
                    <div className="sm:overflow-hidden truncate">
                      {changeDate(item.dob.date)}
                    </div>
                  </td>
                  <td className="border border-slate-300 text-lg text-start px-2 sm:w-full">
                    <div className="sm:overflow-hidden truncate">
                      {item.email}
                    </div>
                  </td>
                  <td className="border border-slate-300 text-lg text-center flex justify-center sm:w-full">
                    <img
                      src={item.picture.thumbnail}
                      alt="avatar"
                      className="w-18 h-14 object-contain"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center py-4">
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={listUser.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
