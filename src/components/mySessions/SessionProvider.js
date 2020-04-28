import React, { useState, useEffect } from "react"

export const SessionsContext = React.createContext()

export const SessionsProvider = (props) => {
    const [sessions, setSessions] = useState([])


    const getSessions = () => {
        return fetch("http://localhost:8088/sessions")
            .then(res => res.json())
            .then(setSessions)
    }

    const addSession = session => {
        return fetch("http://localhost:8088/sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(session)
        })
            .then(getSessions)
    }

    const updateSession = session => {
        return fetch(`http://localhost:8088/sessions/${session.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(session)
        })
            .then(getSessions)
    }

    const deleteSession = sessionId => {
        return fetch(`http://localhost:8088/sessions/${sessionId}`, {
            method: "DELETE"
        })
            .then(getSessions)
    }

    useEffect(() => {
        getSessions()
    }, [])

    useEffect(() => {
        // console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [sessions])

    return (
        <SessionsContext.Provider value={{
            sessions, addSession, deleteSession, updateSession
        }}>
            {props.children}
        </SessionsContext.Provider>
    )
}