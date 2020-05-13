import React, { useContext } from "react"
import { BouldersContext } from "../boulders/BoulderProvider"
import MySessionsBoulder from "./MySessionsBoulder"
import "./MySessions.css"
import { SessionsContext } from "./SessionProvider"


export default (props) => {
    const {boulders} = useContext(BouldersContext)
    const {deleteSession} = useContext(SessionsContext)
    const sessionBoulderArray = boulders.filter(boulder => boulder.sessionId === props.session.id)
    const [yyyy, mm, dd] = props.session.date.split("-")
    const fixedDate = `${mm}/${dd}/${yyyy}`
    const sortedBoulders = sessionBoulderArray.sort((a,b) => b.grade - a.grade)
    
    const deleteSessionFunc = (thisSeshId) => {
        deleteSession(thisSeshId)
    }


    return (
        <>
        <div className="sessionContainer">
            <div className="sessionHeadContainer">
            <div className="dltSeshContainer">
                <button className="dltSeshBtn" onClick={(e) => {
                    e.preventDefault()
                    deleteSessionFunc(props.session.id)}
                    }>Delete Session

                </button>
            </div>
                <div className="sessionDate">
                    {fixedDate} - <span className="sessionLocation">{props.session.location}</span>
                </div>
                
            </div>
            
            <div className="sessionBoulders">
            {
                sortedBoulders.map(seshboulder => <MySessionsBoulder boulder={seshboulder}/>)
            }
            </div>
        </div>
        </>
    )
}