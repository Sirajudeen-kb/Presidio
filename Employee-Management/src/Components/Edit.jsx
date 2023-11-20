import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Edit({ employees, selectedEmployee, setEmployees, setIsEdit }) {

    const id = selectedEmployee.id;

    const [Name, setName] = useState(selectedEmployee.Name);
    const [Age, setAge] = useState(selectedEmployee.Age);
    const [DOB, setDOB] = useState(selectedEmployee.DOB);
    const [Salary, setSalary] = useState(selectedEmployee.Salary);
    const [Department, setDepartment] = useState(selectedEmployee.Department);

    const handleUpdate = e => {
        e.preventDefault();

        if (!Name || !Age || !DOB || !Salary || !Department) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const employee = {
            id,
            Name,
            Age,
            DOB,
            Salary,
            Department
        };

        for (let i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                employees.splice(i, 1, employee);
                break;
            }
        }

        setEmployees(employees);
        setIsEdit(false);

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: `${employee.Name}'s data has been updated.`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="Name">Name</label>
                <input
                    id="Name"
                    type="text"
                    name="Name"
                    value={Name}
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="Age">Age</label>
                <input
                    id="Age"
                    type="text"
                    name="Age"
                    value={Age}
                    onChange={e => setAge(e.target.value)}
                />
                <label htmlFor="DOB">DOB</label>
                <input
                    id="DOB"
                    type="date"
                    name="DOB"
                    value={DOB}
                    onChange={e => setDOB(e.target.value)}
                />
                <label htmlFor="Salary">Salary (₹)</label>
                <input
                    id="Salary"
                    type="text"
                    name="Salary"
                    value={Salary}
                    onChange={e => setSalary(e.target.value)}
                />
                <label htmlFor="Department">Department</label>
                <input
                    id="Department"
                    type="text"
                    name="Department"
                    value={Department}
                    onChange={e => setDepartment(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEdit(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit