const TableBody = ({ tableData, columns }) => {
  return (
    <tbody className="font-medium text-[13px] text-gray-800">
      {tableData.map((data, index) => {
        return (
          <tr key={data.id}>
            {columns.map(({ field }) => {
              const tData = data[field] ? data[field] : "——";
              const id = field === "body" ? `tooltip${field}${index}` : "";
              return (
                <td
                  key={field + index}
                  id={id}
                  className={`p-2 border border-gray-300 ${
                    field === "id" && "text-center"
                  }`}
                >
                  {tData}
                </td>
              );
            })}
          </tr>
        );
      })}
      {[...Array(10 - tableData.length)].map((e, index) => {
        return (
          <tr key={index}>
            {columns.map(({ field }) => {
              return (
                <td
                  key={index + field}
                  className="px-2 py-4 h-14  border border-gray-300"
                ></td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
