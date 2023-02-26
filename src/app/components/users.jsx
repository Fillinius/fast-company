import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from 'prop-types';
import GroupList from "./groupList";
import api from "../api"
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const pageSize = 2 // отображаем по 4 пользователя на каждой страние 
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)// если стр была выбрана
    } // метод который отлав клик при нажатии на стр (на какую стр клик)

    //const userGroup = paginate(users, currentPage, pageSize)
    const filtersUsers = selectedProf
        ? users.filter((user) => user.profession === selectedProf)
        : users
    const count = filtersUsers.length
    const userGroup = paginate(filtersUsers, currentPage, pageSize)
    const clearFilter = () => {
        setSelectedProf()
    }

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        valueProperty='_id'
                        contentProperty='name'>
                    </GroupList>
                    <button
                        className="btn btn-secondary m-2"
                        onClick={clearFilter}
                    >Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column ">
                <SearchStatus length={count} />
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage} />
                </div>
            </div>

        </div>
    );
};
Users.propTypes = {
    handleDelete: PropTypes.func,
    users: PropTypes.array.isRequired,
    handleToggleBookMark: PropTypes.func,
    count: PropTypes.number,
}
export default Users;
