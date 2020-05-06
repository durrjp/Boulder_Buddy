import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [ filteredUsers, setFiltered ] = useState([])
    const [ usersFollowing, setUsersFollowing ] = useState([])
    const [ currentFollowers, setCurrentFollowers ] = useState([])




    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        // console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [users])

    return (
        <UserContext.Provider value={{
            users, addUser, searchTerm, setSearchTerm,
            filteredUsers, setFiltered, usersFollowing,
            setUsersFollowing, currentFollowers, setCurrentFollowers
        }}>
            {props.children}
        </UserContext.Provider>
    )
}