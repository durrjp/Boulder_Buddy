import React, { useContext } from "react"
import { SessionsContext } from "./SessionProvider"
import MySessionsSession from "./MySessionsSession"
import "./MySessions.css"

export default () => {
    const {sessions} = useContext(SessionsContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const currUserSessions = sessions.filter(session => session.userId === currentUserId)
    return (
    <>
    <div className="mySessions">
        <h3>My Sessions</h3>
        {
            currUserSessions.map(cus => <MySessionsSession session={cus} />)
        }
    </div>
    </>
    )
}