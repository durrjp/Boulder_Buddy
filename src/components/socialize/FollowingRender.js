import React, { useState } from "react"
import "./Socialize.css"
import { UserContext } from "../users/UserProvider"
import FollowingStats from "./FollowingStats"
import { Modal, ModalHeader, ModalBody } from "reactstrap"

export default ({ usersFollowing}) => {
    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }
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
                                <ModalBody></ModalBody>
                                    <FollowingStats user={user}/>
                            </Modal>
                            </>
                            )
                        })
                    }
                </div>
            </div>
            
            </>
        )
    
}