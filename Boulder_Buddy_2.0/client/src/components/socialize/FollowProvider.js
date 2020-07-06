import React, { useState, useEffect } from "react"

export const FollowsContext = React.createContext()

export const FollowsProvider = (props) => {
    const [follows, setFollows] = useState([])


    const getFollows = () => {
        return fetch("https://boulder-buddy-api.herokuapp.com/follows", {
            method: "GET",
            headers: {
                "cache-control":"no-cache"
            }
        })
            .then(res => res.json())
            .then(setFollows)
    }

    const addFollow = follow => {
        return fetch("https://boulder-buddy-api.herokuapp.com/follows", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control":"no-cache"
            },
            body: JSON.stringify(follow)
        })
            .then(getFollows)
    }

    const deleteFollow = followId => {
        return fetch(`https://boulder-buddy-api.herokuapp.com/follows/${followId}`, {
            method: "DELETE",
            headers: {
                "cache-control":"no-cache"
            }
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