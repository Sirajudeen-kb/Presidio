import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';


function Add({ employees, setEmployees, setIsAdd }) {
  const [Name, setName] = useState('');
    const [Age, setAge] = useState('');
    const [DOB, setDOB] = useState('');
    const [Salary, setSalary] = useState('');
    const [Department, setDepartment] = useState('');

    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = e => {
        e.preventDefault();
        if (!Name || !Age || !DOB || !Salary || !Department) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const id = employees.length + 1;
        const newEmployee = {
            id,
            Name,
            Age,
            DOB,
            Salary,
            Department
        }
        employees.push(newEmployee);
        setEmployees(employees);
        setIsAdd(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${Name}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
                <label htmlFor="Name">Name</label>
                <input
                    id="Name"
                    type="text"
                    ref={textInput}
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
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdd(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add