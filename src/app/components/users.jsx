import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
//import User from "./user";
import PropTypes from 'prop-types';
import GroupList from "./groupList";
import api from "../api"
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
    const pageSize = 5 // отображаем по 4 пользователя на каждой страние 

    const [users, setUsers] = useState()
    // При использовании асинхронного запроса
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }


    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }
    const handleSort = (item) => {
        //console.log(sortBy.iter);
        setSortBy(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)// если стр была выбрана
    } // метод который отлав клик при нажатии на стр (на какую стр клик)

    //const userGroup = paginate(users, currentPage, pageSize)


    if (users) {

        const filtersUsers = selectedProf
            ? users.filter((user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectedProf))
            : users

        const count = filtersUsers.length
        const sortedUsers = _.orderBy(filtersUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)
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
                            contentProperty='name'
                        />
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
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return 'loading...'
};
Users.propTypes = {
    handleDelete: PropTypes.func,
    users: PropTypes.array.isRequired,
    handleToggleBookMark: PropTypes.func,
    count: PropTypes.number,
}
export default Users;
