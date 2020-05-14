import React, { useState, useEffect } from "react"

export const SessionsContext = React.createContext()

export const SessionsProvider = (props) => {
    const [sessions, setSessions] = useState([])
    const [currentSession, setCurrentSession] = useState({})


    const getSessions = () => {
        return fetch("https://git.heroku.com/boulder-buddy-api.git/sessions", {
            method: "GET",
            headers: {
                "cache-control":"no-cache"
            }
        })
            .then(res => res.json())
            .then(setSessions)
    }


    const addSession = session => {
        return fetch("https://git.heroku.com/boulder-buddy-api.git/sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control":"no-cache"
            },
            body: JSON.stringify(session)
        })
            .then(res => res.json())
            .then((res) => {
                const createdObj = res
                getSessions()
                return createdObj
            })
    }

    const updateSession = session => {
        return fetch(`https://git.heroku.com/boulder-buddy-api.git/sessions/${session.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "cache-control":"no-cache"
            },
            body: JSON.stringify(session)
        })
            .then(getSessions)
    }

    const deleteSession = sessionId => {
        return fetch(`https://git.heroku.com/boulder-buddy-api.git/sessions/${sessionId}`, {
            method: "DELETE",
            headers: {
                "cache-control":"no-cache"
            },
        })
            .then(getSessions)
    }

    useEffect(() => {
        getSessions()
    }, [])

    useEffect(() => {
        // console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [sessions, currentSession])

    return (
        <SessionsContext.Provider value={{
            sessions, addSession, deleteSession, updateSession,
            currentSession, setCurrentSession
        }}>
            {props.children}
        </SessionsContext.Provider>
    )
}