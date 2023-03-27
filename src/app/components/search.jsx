import React from 'react';
import PropTypes from 'prop-types'
//import UserTable from './usersTable';

const Search = ({ type, value, onChange }) => {


  return (
    <>
      <form>
        <label htmlFor="searhText"></label>
        <input
          id="searhText"
          className="form-control"
          type={type}
          value={value}
          placeholder="Search..."
          onChange={onChange}

        ></input>
      </form>


    </>
  );
}
Search.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,

}

export default Search;