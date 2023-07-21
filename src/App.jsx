import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Table from "./components/Table";
import Error from "./components/Error";
import Loading from "./components/Loading";
import SearchBox from "./components/SearchBox";

function App() {
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  return (
    <BrowserRouter>
      <div className="w-[100%] h-[100vh] relative flex flex-col justify-center items-start py-5 px-20">
        <SearchBox />
        <Routes>
          <Route path="/" element={<Navigate to="/1" />} />
          <Route path="/:id" element={<Table />} />
        </Routes>

        {loading && <Loading />}
        {error && <Error />}
      </div>
    </BrowserRouter>
  );
}

export default App;
