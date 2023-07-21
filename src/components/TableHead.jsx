import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortPosts } from "../features/postSlice";

const TableHead = ({ columns }) => {
  const [sorting, setSorting] = useState({});
  const dispatch = useDispatch();
  return (
    <thead className="font-semibold text-sm bg-gray-600 text-white">
      <tr>
        {columns.map(({ label, field }) => {
          return (
            <th
              key={field}
              scope="col"
              className={`px-6 py-3 w-[90px] ${
                field === "title" && "min-w-[300px]"
              } ${field === "body" && "w-[40%] min-w-[450px]"}`}
            >
              <div className="flex items-center justify-center gap-8">
                {label}
                <div
                  className="w-3 h-3 flex items-center cursor-pointer"
                  onClick={() => {
                    dispatch(
                      sortPosts({
                        field: field,
                        ascending: sorting[field] ? true : false,
                      })
                    );
                    setSorting({ ...sorting, [field]: !sorting[field] });
                  }}
                >
                  <img src="./sort.svg" className="w-full" />
                </div>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
