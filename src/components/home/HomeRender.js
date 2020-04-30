import React, { useContext } from "react"

import { UserContext } from "../users/UserProvider"

export default (props) => {
    const { users } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const currentUser = users.find(user => user.id === currentUserId) || {}

    return (
    <>
        <div>Welcome {currentUser.name}</div>
        <div className="homeDivsContainer">
            <div className="home__newSession" onClick={() => props.setActiveList("newSession")}>New Session</div>
            <div className="home__mySessions" onClick={() => props.setActiveList("mySessions")}>My Sessions</div>
            <div className="home__socialize" onClick={() => props.setActiveList("socialize")}>Socialize</div>
            <div className="home__stats" onClick={() => props.setActiveList("stats")}>Stats</div>
        </div>
        <div className="homeLogoContainer"></div>
        
    </>
    )
}