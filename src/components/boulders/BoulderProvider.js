import React, { useState, useEffect } from "react"

export const BouldersContext = React.createContext()

export const BouldersProvider = (props) => {
    const [boulders, setBoulders] = useState([])


    const getBoulders = () => {
        return fetch("https://git.heroku.com/boulder-buddy-api.git/boulders", {
            method: "GET",
            headers: {
                "cache-control":"no-cache"
            }
        })
            .then(res => res.json())
            .then(setBoulders)
    }

    const addBoulder = boulder => {
        return fetch("https://git.heroku.com/boulder-buddy-api.git/boulders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control":"no-cache"

            },
            body: JSON.stringify(boulder)
        })
            .then(getBoulders)
    }

    const updateBoulder = boulder => {
        return fetch(`https://git.heroku.com/boulder-buddy-api.git/boulders/${boulder.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "cache-control":"no-cache"

            },
            body: JSON.stringify(boulder)
        })
            .then(getBoulders)
    }

    const deleteBoulder = boulderId => {
        return fetch(`https://git.heroku.com/boulder-buddy-api.git/boulders/${boulderId}`, {
            method: "DELETE",
            headers: {
                "cache-control":"no-cache"
            },
        })
            .then(getBoulders)
    }

    useEffect(() => {
        getBoulders()
    }, [])

    useEffect(() => {
        // console.log("****  LOCATION APPLICATION STATE CHANGED  ****")
    }, [boulders])

    return (
        <BouldersContext.Provider value={{
            boulders, addBoulder, deleteBoulder, updateBoulder
        }}>
            {props.children}
        </BouldersContext.Provider>
    )
}