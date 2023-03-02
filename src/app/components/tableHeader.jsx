import React from 'react';
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {


    Object.keys(columns).map((column) => {
      return (console.log(columns[column].path))
    })

    console.log(selectedSort.path);

    if (selectedSort.path === item) {
      onSort({ ...selectedSort, order: selectedSort.order === 'asc' ? 'desc' : 'asc' })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (

          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            {...{ role: columns[column].path && 'button' }}
            scope="col"

          >
            {columns[column].name}

            {columns[column].path &&
              columns[column].path === selectedSort.path &&
              <i
                className={"bi bi-caret" + (selectedSort.order === 'asc' ? "-up-fill" : "-down-fill")}
              ></i>
            }

          </th>
        ))}

      </tr>
    </thead>
  );
}
TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader;

// columns[column][columns[column].path]
/*
columns[column][
              columns[column].path === selectedSort.path
                ? columns[column].path
                : undefined] &&
*/
