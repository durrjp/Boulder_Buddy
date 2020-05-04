import React,{ useContext, useState, useRef, useEffect } from "react"
import BarGraph from "./BarGraph"
import "./Stats.css"
import PieChart from "./PieChart"
import { SessionsContext } from "../mySessions/SessionProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { UserContext } from "../users/UserProvider"



export default (props) => {
    const [pieGrade, setPieGrade] = useState(0)
    const { users } = useContext(UserContext)
    const {sessions} = useContext(SessionsContext)
    const {boulders} = useContext(BouldersContext)
    const dropDownValue = useRef(0)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))

    const currentUser = users.find(user => user.id === currentUserId) || {}
    const currUserSessions = sessions.filter(session => session.userId === currentUserId)
    const currUserSessionIdsArray = currUserSessions.map(cus => {
        return cus.id
    })
    const userBoulders = boulders.filter(boulder => {
        return currUserSessionIdsArray.includes(boulder.sessionId)
    })
    let userBoulderGrades = {}
    userBoulders.map(boulder => {
        if (!userBoulderGrades.hasOwnProperty(boulder.grade)) {
            userBoulderGrades[boulder.grade] = "filler"
        }
    })
    let userBoulderGradesDropdown = Object.keys(userBoulderGrades)
    
    const highBoulders = userBoulderGradesDropdown.map(grade => parseInt(grade))
    const highestBoulder = Math.max(...highBoulders)

    return (
        <>
        <div className="statsHeader">Stats</div>
        <div>
            <div className="statsClimber">
                <div>Climber:</div>
                <div>{currentUser.name}</div>
            </div>
            <div className="statsHighest">
                <div>Highest Boulder:</div>
                <div>V{highestBoulder}</div>
            </div>
        </div>
        <div className="barGraphContainer">
            <BarGraph />
        </div>
        <div className="pieChartContainer">
            <div className="pieSelectContainer">
                <div>Select Boudler Grade: </div>
                <select onChange={(e) =>  {
                    e.preventDefault()
                    setPieGrade(e.target.value)
                }}
                ref={dropDownValue}
                >
                    {
                        userBoulderGradesDropdown.map(grade => {
                        return <option value={grade}>V{grade}</option>
                        })
                    }
                </select>
            </div>
            <PieChart pieGrade={pieGrade} userBoulders={userBoulders}/>
        </div>
        </>
    )
}