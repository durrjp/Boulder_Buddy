import React, { useContext } from "react"
import { SessionsContext } from "./SessionProvider"
import MySessions_Session from "./MySessions_Session"

export default () => {
    const {sessions} = useContext(SessionsContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const currUserSessions = sessions.filter(session => session.userId === currentUserId)
    return (
    <>
        <h3>My Sessions</h3>
        {
            currUserSessions.map(cus => <MySessions_Session session={cus} />)
        }
    </>
    )
}