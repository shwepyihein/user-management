import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { useQuery } from "react-query";
import { fetchUserList } from "../../api/user/user";
import ReactPaginate from "react-paginate";

const UserListpage = () => {
  const [filter, setFitler] = React.useState({
    page: 0,
    gender: "",
    nat: "US",
  });

  const {
    isLoading,
    isError,
    data: userList,
  } = useQuery({
    queryKey: ["userList", filter],
    queryFn: () => fetchUserList(filter),
  });

  const handlePaginate = (selectedItem: { selected: number }) => {
    setFitler({ ...filter, page: selectedItem.selected });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFitler({ ...filter, [e.target.name]: e.target.value });
  };

  return isLoading ? (
    <div className="flex h-[300px] py-10 mt-3 items-center justify-center">
      <span className="animate-ping absolute inline-flex h-[100px] w-[100px] rounded-full bg-sky-400 opacity-75"></span>
    </div>
  ) : isError ? (
    <div>Error: </div>
  ) : (
    <div className="max-w-7xl py-10 mt-3 mx-auto px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Contacts </h1>
        <div className="flex gap-2">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={filter.gender}
              onChange={handleFilter}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="both"
            >
              <option value={""}>Both</option>
              <option value={"female"}>Female</option>
              <option value={"male"}>Male</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="nat"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>
            <select
              id="nat"
              value={filter.nat}
              name="nat"
              onChange={handleFilter}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="US"
            >
              <option value={"US"}>United States</option>
              <option value={"CA"}>Canada</option>
              <option value={"MX"}>Mexico</option>
            </select>
          </div>
        </div>
      </div>
      <div className="py-10 px-10">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 "
        >
          {userList?.data?.results.map((person: any) => (
            <li
              key={person.email}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex p-3">
                <img
                  className="mx-auto h-24 w-24 flex-shrink-0 rounded-full"
                  src={person.picture.large}
                  alt=""
                />
                <div className="text-start mt-2">
                  <h3 className=" text-sm font-medium text-gray-900">
                    {`${person.name.title} . ${person.name.first} ${person.name.last}`}
                  </h3>
                  <div className="text-xs mt-3">
                    <table>
                      <tr className="flex">
                        <td>Email:{person.email}</td>
                      </tr>
                      <tr className="flex">
                        <td>Phone:{person.cell}</td>
                      </tr>
                      <tr className="flex">
                        <td>
                          Address:{" "}
                          {`${person.location.street.number} 
                        ${person.location.street.name}`}
                        </td>
                      </tr>
                      <tr className="flex">
                        <td>National: {`${person.nat} `}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <dd className="mt-3 py-2 flex justify-center">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  {person.gender}
                </span>
              </dd>
            </li>
          ))}
        </ul>
        <div className="mt-20">
          <ReactPaginate
            previousLabel={
              filter.page === 0 ? "" : <ChevronLeftIcon className="w-5 " />
            }
            nextLabel={
              20 === filter.page ? "" : <ChevronRightIcon className="w-5 " />
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            activeClassName={"active"}
            containerClassName={"pagination"}
            initialPage={filter.page}
            pageCount={Math.ceil(100 / 9) || 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePaginate}
          />
        </div>
      </div>
    </div>
  );
};

export default UserListpage;
