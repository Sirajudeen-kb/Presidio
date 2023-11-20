import React, { useState } from 'react';

function Header({ setIsAdd, handleSearch, handleFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all'); // 'all' is the default option

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value, filterOption);
  };

  const handleFilterChange = (e) => {
    const newFilterOption = e.target.value;
    setFilterOption(newFilterOption);
    handleFilter(searchTerm, newFilterOption);
  };

  return (
    <header>
      <h1 className='text-center'>Employee Management Application</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleInputChange}
            className='search-box'
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor='filterDropdown'>Filter by Department: </label>
          <select
            id='filterDropdown'
            value={filterOption}
            onChange={handleFilterChange}
          >
            <option value='all'>All Departments</option>
            <option value='human resources'>Human Resources</option>
            <option value='development'>Development</option>
            <option value='marketing'>Marketing</option>
            <option value='finance'>Finance</option>
          </select>
        </div>
        <button onClick={() => setIsAdd(true)} className='round-button'>
          Add Employee
        </button>
      </div>
    </header>
  );
}

export default Header;
