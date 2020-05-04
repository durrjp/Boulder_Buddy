import React, { useContext } from "react"
import { SessionsContext } from "./SessionProvider"
import MySessionsSession from "./MySessionsSession"
import "./MySessions.css"

export default () => {
    const {sessions} = useContext(SessionsContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const currUserSessions = sessions.filter(session => session.userId === currentUserId)
    const sortedUserSessions = currUserSessions.sort((a,b) => new Date(b.date) - new Date(a.date))

    return (
    <>
    <div className="mySessions">
        <div className="mySessionsHeader">My Sessions</div>
        {
            sortedUserSessions.map(cus => <MySessionsSession session={cus} />)
        }
    </div>
    </>
    )
}