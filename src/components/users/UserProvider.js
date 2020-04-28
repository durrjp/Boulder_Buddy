import React, { useState, useEffect } from "react"

export const UsersContext = React.createContext()

export const UsersProvider = (props) => {
    const [users, setUsers] = useState([])


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
        <UsersContext.Provider value={{
            users, addUser
        }}>
            {props.children}
        </UsersContext.Provider>
    )
}