import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../../Components/Header';
import Add from '../../Components/Add';
import Edit from '../../Components/Edit';
import List from '../../Components/List';
import { employeeData } from '../../Data/index';

function Dashboard() {
  const [allEmployees, setAllEmployees] = useState(employeeData);
  const [filteredEmployees, setFilteredEmployees] = useState(allEmployees);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    // If the search term is empty, reset the filtered employee list
    if (!searchTerm) {
      setFilteredEmployees(allEmployees);
      return;
    }

    // Perform the search logic here
    const filtered = allEmployees.filter((employee) =>
      employee.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update the state with the filtered employees
    setFilteredEmployees(filtered);
  };

  const handleFilter = (searchTerm, filterOption) => {
    setFilterOption(filterOption);

    // If the filter option is 'all', reset the filtered employee list
    if (filterOption === 'all') {
      setFilteredEmployees(allEmployees);
      return;
    }

    // Perform the filter logic here
    const filtered = allEmployees.filter(
      (employee) => employee.Department.toLowerCase() === filterOption.toLowerCase()
    );

    // Update the state with the filtered employees
    setFilteredEmployees(filtered);
  };

  const handleEdit = (id) => {
    const [employee] = allEmployees.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEdit(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.value) {
        const [employee] = allEmployees.filter((employee) => employee.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${employee.Name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        setAllEmployees(allEmployees.filter((employee) => employee.id !== id));
        setFilteredEmployees(filteredEmployees.filter((employee) => employee.id !== id));
      }
    });
  };

  return (
    <div className='container'>
      {!isAdd && !isEdit && (
        <>
          <Header setIsAdd={setIsAdd} handleSearch={handleSearch} handleFilter={handleFilter} />
          <List employees={filteredEmployees} handleEdit={handleEdit} handleDelete={handleDelete} searchTerm={searchTerm} />
        </>
      )}
      {isAdd && <Add employees={allEmployees} setEmployees={setAllEmployees} setIsAdd={setIsAdd} />}
      {isEdit && <Edit employees={allEmployees} setEmployees={setAllEmployees} setIsEdit={setIsEdit} selectedEmployee={selectedEmployee} />}
    </div>
  );
}

export default Dashboard;
