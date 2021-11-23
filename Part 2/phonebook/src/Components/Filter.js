import React from "react";

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter: <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
