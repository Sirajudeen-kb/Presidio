import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Header from '../../Components/Header'
import Add from '../../Components/Add'
import Edit from '../../Components/Edit'
import List from '../../Components/List'
import { employeeData } from '../../Data/index'

function Dashboard() {

  const [employees, setEmployees] = useState(employeeData)
  const [isAdd, setIsAdd] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  
    // If the search term is empty, reset the employee list
    if (!searchTerm) {
      setEmployees(employeeData);
      return;
    }
  
    // Perform the search logic here
    const filteredEmployees = employeeData.filter((employee) =>
      employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Update the state with the filtered employees
    setEmployees(filteredEmployees);
  };
  

  const handleEdit = (id) => {
    const [employee] = employees.filter(employee => employee.id === id);

        setSelectedEmployee(employee);
        setIsEdit(true);
  }

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  }).then(result => {
      if (result.value) {
          const [employee] = employees.filter(employee => employee.id === id);

          Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `${employee.Name}'s data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
          });

          setEmployees(employees.filter(employee => employee.id !== id));
      }
  });
  }


  return (
    <div className='container'>
      { !isAdd && !isEdit && (
        <>
        <Header setIsAdd={setIsAdd} handleSearch={handleSearch} />

        <List
  employees={employees}
  handleEdit={handleEdit}
  handleDelete={handleDelete}
  searchTerm={searchTerm}
/>

        </>
      )}
      {isAdd && (
        <Add
        employees={employees}
        setEmployees={setEmployees}
        setIsAdd={setIsAdd}
        />
      )}
      {isEdit && (
        <Edit
        employees={employees}
        setEmployees={setEmployees}
        setIsEdit={setIsEdit}
        selectedEmployee={selectedEmployee}
        />
      )}
    </div>
  )
}

export default Dashboard