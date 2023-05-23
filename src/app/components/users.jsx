import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import GroupList from "./common/groupList";
// import api from "../api"
import SearchStatus from "./ui/searchStatus";
import UserTable from "./ui/usersTable";
import _ from "lodash";
import Search from "./search";
import { useUser } from "../hooks/useUsers";
import { useProfession } from "../hooks/useProfession";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const { users } = useUser()
    const { professions, isLoading: professionsIsLoading } = useProfession()
    const { currentUser } = useAuth()
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' })
    const pageSize = 4 // отображаем по 4 пользователя на каждой страние 

    // const [users, setUsers] = useState()
    // При использовании асинхронного запроса
    // useEffect(() => {
    //     api.users.fetchAll().then((data) => setUsers(data))
    // }, [])

    const handleDelete = (userId) => {
        //setUsers(users.filter((user) => user._id !== userId))
        console.log('userId', userId);
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        console.log('newArray', newArray);
        //setUsers( newArray)
    }

    // const [professions, setProfession] = useState()
    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfession(data))
    // }, [])

    const handleProfessionSelect = (item) => {
        setSearch("")
        setSelectedProf(item)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)// если стр была выбрана
    } // метод который отлав клик при нажатии на стр (на какую стр клик)

    //const userGroup = paginate(users, currentPage, pageSize)


    if (users) {

        function filterUsers(data) {
            const filteredUsers = selectedProf
                ? data.filter((user) =>
                    JSON.stringify(user.profession) === JSON.stringify(selectedProf))
                : data
            return filteredUsers.filter((u) => u._id !== currentUser._id)
        }
        const filteredUsers = filterUsers(users)

        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }
        //// метод по search
        const handleChangeSearch = ({ target }) => {
            // setSelectedProf()
            setSearch(target.value)


        }
        const searchTextUser = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase()))

        return (
            <div className="d-flex">
                {professions && !professionsIsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={search === "" ? selectedProf : searchTextUser}
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
                    <SearchStatus length={search === "" ? count : searchTextUser.length} />
                    <Search
                        type="text"
                        value={search}
                        onChange={handleChangeSearch}
                    />
                    {count > 0 && (
                        <UserTable
                            users={search === "" ? usersCrop : searchTextUser}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={search === "" ? count : searchTextUser.length}
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

export default Users;
