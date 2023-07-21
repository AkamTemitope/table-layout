import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getNextPage, getPage, getPrevPage } from "../features/postSlice";

const Navigation = () => {
  const pager = useSelector((state) => state.posts.pager);
  const pages = useSelector((state) => state.posts.pages);
  const pageNumber = useSelector((state) => state.posts.pageNumber);
  const dispatch = useDispatch();

  return (
    <nav
      className="w-full max-h-[52px] flex flex-auto items-center justify-between pt-4  text-gray-600"
      aria-label="Table navigation"
    >
      <Link
        to={`/${pageNumber - 1}`}
        className={`flex ml-12  ${
          pageNumber === 1 && "pointer-events-none text-gray-300"
        }`}
      >
        <button
          onClick={() => dispatch(getPrevPage())}
          className="text-lg lg:text-2xl font-medium "
        >
          Назад
        </button>
      </Link>
      <ul className="inline-flex gap-3 items-center h-8">
        {pager.map((page) => (
          <li key={page}>
            <Link
              to={`/${page}`}
              className={`flex items-center justify-center ${
                pageNumber === page && "text-lime-500"
              } `}
            >
              <button
                onClick={() => dispatch(getPage(page))}
                className="italic text-sm lg:text-lg font-bold"
              >
                {page}
              </button>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={`/${pageNumber + 1}`}
        className={`flex  mr-12 ${
          pageNumber === pages && "pointer-events-none text-gray-300"
        }`}
      >
        <button
          onClick={() => dispatch(getNextPage())}
          className="text-lg lg:text-2xl font-medium"
        >
          Далее
        </button>
      </Link>
    </nav>
  );
};

export default Navigation;
