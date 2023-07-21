import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchInPosts } from "../features/postSlice";

const SearchBox = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputSearch.trim()), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputSearch]);

  useEffect(() => {
    dispatch(searchInPosts(debouncedValue));
  }, [debouncedValue, dispatch]);

  return (
    <div className="relative w-full max-w-[631px] h-[52px] mb-4 flex justify-between self-start bg-gray-600">
      <input
        type="text"
        id="table-search"
        placeholder="Поиск"
        value={inputSearch}
        className="outline-gray-200 flex-1 px-6 py-4 text-sm font-normal text-white bg-gray-600"
        onChange={(e) => setInputSearch(e.target.value)}
      />
      <div className="absolute top-[50%] right-[0%] translate-x-[0%] translate-y-[-50%] flex px-4 py-4">
        <img src="/search.svg" width="21px" height="21px" />
      </div>
    </div>
  );
};

export default SearchBox;
