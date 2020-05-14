import React from "react"
import "./Socialize.css"
import "./Table.css"

export default ({user, counter}) => {
    return (
        <tr className="">
            <td>{counter}</td>
            <td>{user.userName}</td>
            <td>V{user.highestGrade}</td>
            <td>{user.sends}</td>
        </tr>
    )
}