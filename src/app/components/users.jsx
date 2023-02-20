import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from 'prop-types';

const Users = ({ users, ...rest }) => {
    const count = users.length
    const pageSize = 4 // отображаем по 4 пользователя на каждой страние 
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)// если стр была выбрана
    } // метод который отлав клик при нажатии на стр (на какую стр клик)

    //const userGroup = paginate(users, currentPage, pageSize)

    const userGroup = paginate(users, currentPage, pageSize)

    return (
        <>
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Провфессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userGroup.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage} />
        </>
    );
};
Users.propTypes = {
    handleDelete: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    handleToggleBookMark: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
}
export default Users;
