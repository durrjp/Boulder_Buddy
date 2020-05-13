import React, { useState } from "react"
import "./Socialize.css"
import { UserContext } from "../users/UserProvider"
import FollowingStats from "./FollowingStats"
import { Modal, ModalHeader, ModalBody } from "reactstrap"

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