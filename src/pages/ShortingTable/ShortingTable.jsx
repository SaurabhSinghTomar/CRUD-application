import React, { useCallback, useEffect, useState } from "react";
import "./style.scss";
import ShortTextIcon from "@mui/icons-material/ShortText";

const ShortingTable = () => {
  const [apiData, setApiData] = useState([]);
  const [sortKey, setSortKey] = useState("id");
  const [sortOrder, setSortOrder] = useState("ascn");
  const url = "	https://dummy.restapiexample.com/api/v1/employees";

  useEffect(() => {
    (async () => {
      const data = await fetch(url)
        .then((response) => response.json())
        .then((data) => data);
      setApiData(data?.data);
    })();
  }, []);

  const sortData = (tableData, sortKey, reverse) => {
    const newData = tableData.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
      return newData.reverse();
    }

    return newData;
  };

  const headers = [
    { key: "id", label: "ID" },
    { key: "employee_name", label: " Name" },
    { key: "employee_age", label: "Age" },
    { key: "employee_salary", label: "Salery" },
  ];

  const sortedData = useCallback(
    () => sortData(apiData, sortKey, sortOrder === "desc"),
    [apiData, sortKey, sortOrder]
  );

  function changeSort(key) {
    setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }
  return (
    <div>
      <table id="employee">
        <tr>
          {headers.map((data) => {
            return (
              <th onClick={() => changeSort(data.key)}>
                {data.label}
                <ShortTextIcon />
              </th>
            );
          })}
        </tr>

        {sortedData().map((data) => {
          return (
            <tr>
              <td>{data.id}</td>
              <td>{data.employee_name}</td>
              <td>{data.employee_age}</td>
              <td>{data.employee_salary}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ShortingTable;
