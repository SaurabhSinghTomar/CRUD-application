export const Columns = [
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
  },
  {
    name: "Buttons",
    button: true,
    cell: (row) =>
      row.showButtons ? (
        <>
          <button
            onClick={() => alert(row.index)}
            style={{ marginRight: "5px" }}
          >
            Edit
          </button>
          <button onClick={() => alert(row.name)}>Delete</button>
        </>
      ) : null,
  },
];
