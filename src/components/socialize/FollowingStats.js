import React,{ useContext, useState, useRef} from "react"
import BarGraph from "../stats/BarGraph"
import "../stats/Stats.css"
import PieChart from "../stats/PieChart"
import { SessionsContext } from "../mySessions/SessionProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "../BoulderBuddy.css"
import "./Socialize.css"
import {ReactComponent as Socialize} from "../home/homeImages/friends.svg"


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

    const [noStatsModal, setNoStatsModal] = useState(false)
    const toggleNoStatsModal = () => {
        setNoStatsModal(!noStatsModal)
    }

    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }
    const filteredSessions = sessions.filter(session => {
        return session.userId === user.id
    })
    if(filteredSessions.length !== 0) {
        return (
            <>
            <div className="followingStatsContainer">
                <Socialize className="friend_Icon"/>
                <div className="friendName">{user.name}</div>
                <button className="friendStatsBtn" onClick={toggle}>Stats</button>
                <Modal className="friendStatsModal" isOpen={modal} >
                    <ModalHeader toggle={toggle}>
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
                            <BarGraph user={user}/>
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
            </div>
            </>
        )
    } else {
        return (
            <>
            <div className="followingStatsContainer">
                <Socialize className="friend_Icon"/>
                <div className="friendName">{user.name}</div>
                <button className="friendStatsBtn noStats" onClick={toggleNoStatsModal}>Stats</button>
                <Modal isOpen={noStatsModal} >
                    <ModalHeader toggle={toggleNoStatsModal}>
                    </ModalHeader>
                    <ModalBody>
                        <div className="statsHeader">Stats</div>
                        <div>User has not logged any sessions...</div>
                    </ModalBody>
                </Modal>
            </div>
            </>
        )
    }
   
}