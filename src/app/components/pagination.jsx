import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props //деструктуризация объекта children
  const pageCount = Math.ceil(itemsCount / pageSize)  // кол-во стр. для отобр рез маф округл в большую сторону
  if (pageCount === 1) { return null } //если стр для отобр только одна
  const pages = _.range(1, pageCount + 1) // создание массива
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={"page-item " + (page === currentPage ? "active" : "")}
            key={'page' + page}>
            <button
              className="page-link"
              onClick={() => onPageChange(page)}>{page}
            </button>
          </li>
        ))}

      </ul>
    </nav>

  );
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
}
export default Pagination;