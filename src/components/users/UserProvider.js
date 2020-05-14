import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [ filteredUsers, setFiltered ] = useState([])
    const [ usersFollowing, setUsersFollowing ] = useState([])
    const [ currentFollowers, setCurrentFollowers ] = useState([])




    const getUsers = () => {
        return fetch("https://boulder-buddy-api.herokuapp.com/users", {
            method: "GET",
            headers: {
                "cache-control":"no-cache"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const addUser = user => {
        return fetch("https://boulder-buddy-api.herokuapp.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control":"no-cache"
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