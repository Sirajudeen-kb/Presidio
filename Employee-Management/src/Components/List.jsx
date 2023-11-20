import React from "react";

function List({ employees, handleEdit, handleDelete, searchTerm }) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th className="text-center">No</th>
            <th className="text-center">Name</th>
            <th className="text-center">Age</th>
            <th className="text-center">DOB</th>
            <th className="text-center">Salary</th>
            <th className="text-center">Department</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id}>
                <td className="text-center">{i + 1}</td>
                <td className="text-center">{employee.Name}</td>
                <td className="text-center">{employee.Age}</td>
                <td className="text-center">{employee.DOB}</td>
                <td className="text-center">
                  {formatter.format(employee.Salary)}
                </td>
                <td className="text-center">{employee.Department}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No matching records</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
