import React, { useState, useEffect } from "react"

export const BouldersContext = React.createContext()

export const BouldersProvider = (props) => {
    const [boulders, setBoulders] = useState([])


    const getBoulders = () => {
        return fetch("http://localhost:8088/boulders")
            .then(res => res.json())
            .then(setBoulders)
    }

    const addBoulder = boulder => {
        return fetch("http://localhost:8088/boulders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boulder)
        })
            .then(getBoulders)
    }

    const updateBoulder = boulder => {
        return fetch(`http://localhost:8088/boulders/${boulder.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(boulder)
        })
            .then(getBoulders)
    }

    const deleteBoulder = boulderId => {
        return fetch(`http://localhost:8088/boulders/${boulderId}`, {
            method: "DELETE"
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