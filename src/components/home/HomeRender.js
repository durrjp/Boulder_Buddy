import React, { useState, useContext } from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import NewSessionForm from "../newSessions/NewSessionForm"
import { UserContext } from "../users/UserProvider"

export default (props) => {
    const { users } = useContext(UserContext)
    const [ modal, setModal ] = useState(false)
    const toggle = () => setModal(!modal)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))

    const findCurrentUser = () => {
        const currentUser = users.find(user => user.id === currentUserId)
        return currentUser.name
    }

    return (
    <>
        <div>Welcome {users.map(user=> user.name)}</div>
        <div className="homeDivsContainer">
            <div className="home__newSession" onClick={toggle}>New Session</div>
            <div className="home__mySessions" onClick={() => props.setActiveList("mySessions")}>My Sessions</div>
            <div className="home__socialize" onClick={() => props.setActiveList("socialize")}>Socialize</div>
            <div className="home__stats" onClick={() => props.setActiveList("stats")}>Stats</div>
        </div>
        <div className="homeLogoContainer"></div>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                New Session
            </ModalHeader>
            <ModalBody>
                <NewSessionForm setActiveList={props.setActiveList} toggle={toggle} />
            </ModalBody>
        </Modal>
    </>
    )
}