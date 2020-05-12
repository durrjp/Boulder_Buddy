import React, { useState } from "react"
import "./Socialize.css"
import { UserContext } from "../users/UserProvider"
import FollowingStats from "./FollowingStats"
import { Modal, ModalHeader, ModalBody } from "reactstrap"

export default ({ usersFollowing}) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    if(usersFollowing.length !== 0) {
        return (
            <>
            <div className="followingContainer">
                <div className="following">Following ({usersFollowing.length})</div>
                <div className="followingList">
                    {
                        usersFollowing.map(user => {
                            return (
                            <>
                            <div>{user.name}</div>
                            <button onClick={toggle}>Stats</button>
                            <Modal isOpen={modal} >
                                <ModalHeader toggle={toggle}>Stats
                                </ModalHeader>
                                <ModalBody>
                                    <FollowingStats />
                                </ModalBody>
                            </Modal>
                            </>
                            )
                        })
                    }
                </div>
            </div>
            
            </>
        )
    } else {
        return "didn't load in time..."
    }
}