import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import Navigation from "./Navigation";
import { postUrl, columns } from "../constants";
import { setError, setPosts } from "../features/postSlice";

const Table = () => {
  const posts = useSelector((state) => state.posts.pagePosts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await axios.get(postUrl);
        dispatch(setPosts(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    getAllPosts();
  }, [dispatch]);

  return (
    <>
      <div className="w-full flex-1 overflow-x-auto">
        <table className="w-full text-sm text-gray-500 dark:text-gray-400 ">
          <TableHead columns={columns} />
          <TableBody tableData={posts} columns={columns} />
        </table>
      </div>
      <Navigation />
    </>
  );
};

export default Table;
