import React, { useContext } from "react"
import { BouldersContext } from "../boulders/BoulderProvider"
import MySessions_Boulder from "./MySessions_Boulder"

export default (props) => {
    const {boulders} = useContext(BouldersContext)
    const sessionBoulderArray = boulders.filter(boulder => boulder.sessionId === props.session.id)

    return (
        <>
            <div>{props.session.date}</div>
            {
                sessionBoulderArray.map(seshboulder => <MySessions_Boulder boulder={seshboulder}/>)
            }
        </>
    )
}