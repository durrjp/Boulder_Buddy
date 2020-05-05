import React, { useState, useEffect } from "react"

export const FollowsContext = React.createContext()

export const FollowsProvider = (props) => {
    const [follows, setFollows] = useState([])


    const getFollows = () => {
        return fetch("http://localhost:8088/follows")
            .then(res => res.json())
            .then(setFollows)
    }

    const addFollow = follow => {
        return fetch("http://localhost:8088/follows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follow)
        })
            .then(getFollows)
    }

    const deleteFollow = followId => {
        return fetch(`http://localhost:8088/follows/${followId}`, {
            method: "DELETE"
        })
            .then(getFollows)
    }

    useEffect(() => {
        getFollows()
    }, [])

    useEffect(() => {
        // console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [follows])

    return (
        <FollowsContext.Provider value={{
            follows, addFollow, deleteFollow
        }}>
            {props.children}
        </FollowsContext.Provider>
    )
}