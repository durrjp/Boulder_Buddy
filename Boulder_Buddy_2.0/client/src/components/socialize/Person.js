import React from "react"
import "./Socialize.css"

export default ({ user, constructFollow }) => {
    const userHelper = user || {}

    return (
        <div className="person">
            <div className="personName">{userHelper.name}</div>
            <button className="followButton" onClick={(e) => {
                constructFollow(user)
            }}>Follow
            </button>
        </div>
    )
}