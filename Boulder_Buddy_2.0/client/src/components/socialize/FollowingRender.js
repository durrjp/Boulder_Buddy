import React, { useState } from "react"
import "./Socialize.css"
import FollowingStats from "./FollowingStats"

export default ({ usersFollowing}) => {

        return (
            <>
            <div className="followingContainer">
                <div className="following">Following ({usersFollowing.length})</div>
                <div className="followingList">
                    {
                        usersFollowing.map(user => {
                            return (
                            <>
                            <FollowingStats user={user}/>
                            </>
                            )
                        })
                    }
                </div>
            </div>
            </>
        )
}