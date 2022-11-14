import React from "react";
import DataTable from "react-data-table-component";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export const Table = ({ handleIconClick, data, filterText }) => {
  const Columns = [
    {
      name: "Coures Name",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Course Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Course Fees",
      selector: (row) => row.fees,
      sortable: true,
    },
    {
      name: "Coures Subjects",
      selector: (row) => row.subjects,
    },
    {
      name: "Course Description",
      selector: (row) => row.desc,
    },
    {
      name: "Course Rating",
      selector: (row) => row.rating,
      sortable: true,
    },
    {
      name: "Options",
      selector: (row) => row.option,
      button: true,
      cell: (row) =>
        row.showButtons ? (
          <>
            <a
              onClick={() => handleIconClick(row.id, "view")}
              style={{ marginRight: "5px", cursor: "pointer" }}
            >
              <RemoveRedEyeIcon color="primary" />
            </a>
            <a
              onClick={() => handleIconClick(row.id, "edit")}
              style={{ marginRight: "5px", cursor: "pointer" }}
            >
              <EditIcon color="secondary" />
            </a>
            <a
              onClick={() => handleIconClick(row.id, "delete")}
              style={{ marginRight: "5px", cursor: "pointer" }}
            >
              <DeleteIcon color="error" />
            </a>
          </>
        ) : null,
    },
  ];
  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  return <DataTable columns={Columns} data={filteredItems} responsive={true} />;
};
