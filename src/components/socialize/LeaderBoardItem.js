import React from "react"
import "./Socialize.css"

export default ({boulder, currSesh, currUser, counter}) => {
    let fill = ""
    if (counter % 2 === 0) {
        fill = "filled"
    }
    else {
        fill="normal"
    }
    return (
        <tr className={fill}>
            <td>{counter}</td>
            <td>{currUser.name}</td>
            <td>V{boulder.grade}</td>
            <td>{boulder.attempts}</td>
            <td>{currSesh.location}</td>
        </tr>
    )
}