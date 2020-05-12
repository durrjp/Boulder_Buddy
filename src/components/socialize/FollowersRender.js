import React from "react"
import "./Socialize.css"

export default ({currentFollowers}) => {
    return (
        <div className="followersContainer">
            <div className="followers">Followers ({currentFollowers.length})</div>
            <div className="followersList">
                {
                    currentFollowers.map(user => {
                        return (
                        <div>{user.name}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}