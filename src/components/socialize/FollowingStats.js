import React,{ useContext, useState, useRef} from "react"
import BarGraph from "../stats/BarGraph"
import "../stats/Stats.css"
import PieChart from "../stats/PieChart"
import { SessionsContext } from "../mySessions/SessionProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "../BoulderBuddy.css"

export default ({user}) => {
    const [pieGrade, setPieGrade] = useState(0)
    const {sessions} = useContext(SessionsContext)
    const {boulders} = useContext(BouldersContext)
    const dropDownValue = useRef(0)
    let currUserSessions = []
    currUserSessions = sessions.filter(session => session.userId === user.id)
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
    
    const userBouldersSent = userBoulders.map(boulder => {
        if (boulder.sent === true) {
            return parseInt(boulder.grade)
        }
        return 0
    })
    const highestBoulder = Math.max(...userBouldersSent)

    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }
    return (
        <>
        <div>{user.name}</div>
        <button onClick={toggle}>Stats</button>
        <Modal isOpen={modal} >
            <ModalHeader toggle={toggle}>Stats
            </ModalHeader>
            <ModalBody>

                <div className="statsHeader">Stats</div>
                <div>
                    <div className="statsClimber">
                        <div>Climber:</div>
                        <div>{user.name}</div>
                    </div>
                    <div className="statsHighest">
                        <div>Highest Grade:</div>
                        <div>V{highestBoulder}</div>
                    </div>
                </div>
                <div className="barGraphContainer">
                    <div className="instruct">Total Boulders Climbed</div>
                    <BarGraph />
                </div>
                <div className="pieChartContainer">
                    <div className="instruct">Flash % by Grade: </div>
                    <div className="pieSelectContainer">
                        <div className="gradeSelectHead">Select Boudler Grade: </div>
                        <select className="gradeSelect" onChange={(e) =>  {
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
            </ModalBody>
        </Modal>
        </>
    )
   
}