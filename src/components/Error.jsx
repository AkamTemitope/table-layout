const Error = () => {
  return (
    <div
      role="alert"
      className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "
    >
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Error
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Opps, Something went wrong.</p>
        <p>Couldn't get the posts</p>
      </div>
    </div>
  );
};

export default Error;
