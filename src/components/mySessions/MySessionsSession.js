import React, { useContext } from "react"
import { BouldersContext } from "../boulders/BoulderProvider"
import MySessionsBoulder from "./MySessionsBoulder"
import "./MySessions.css"


export default (props) => {
    const {boulders} = useContext(BouldersContext)
    const sessionBoulderArray = boulders.filter(boulder => boulder.sessionId === props.session.id)
    const [yyyy, mm, dd] = props.session.date.split("-")
    const fixedDate = `${mm}/${dd}/${yyyy}`
    const sortedBoulders = sessionBoulderArray.sort((a,b) => b.grade - a.grade)


    return (
        <>
        <div className="sessionContainer">
            <div className="sessionTitle"></div>
            <div className="sessionDate">
                {fixedDate} - <span className="sessionLocation">{props.session.location}</span>
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