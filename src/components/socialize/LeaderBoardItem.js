import React from "react"
import "./Socialize.css"

export default ({boulder, currSesh, currUser, counter}) => {
    return (
        <tr className="">
            <td>{counter}</td>
            <td>{currUser.name}</td>
            <td>V{boulder.grade}</td>
            <td>{boulder.attempts}</td>
            <td>{currSesh.location}</td>
        </tr>
    )
}