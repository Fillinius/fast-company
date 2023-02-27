import React from 'react';
import PropTypes from 'prop-types'
// компонент где будут отражаться элементы для фильтрации

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
  const changeMetod = () =>
    Array.isArray(items) ? items : Object.values(items)

  return (
    <ul className="list-group">
      {changeMetod().map((item) => (
        <li
          key={item[valueProperty]}
          className={"list-group-item " + (selectedItem === item ? "active" : "")}
          onClick={() => onItemSelect(item)}
          role='button'
        >{item[contentProperty]}
        </li>
      ))}
    </ul>
  );
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
}


export default GroupList;

