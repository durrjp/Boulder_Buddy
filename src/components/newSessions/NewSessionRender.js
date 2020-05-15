import React, { useRef, useContext } from "react"
import NewSessionForm from "../newSessions/NewSessionForm"
import CurrentSessionBoulder from "./CurrentSessionBoulder"
import { SessionsContext } from "../mySessions/SessionProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import NewBoulderButton from "./NewBoulderButton"
import "../BoulderBuddy.css"


export default (props) => {
    const { currentSession } = useContext(SessionsContext)
    const { boulders, addBoulder } = useContext(BouldersContext)
    const newBoulderDiv = useRef("")
    const newSessionDiv = useRef("")

    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))

    const handleClick =()=> {
        const wrapper = newBoulderDiv.current
        wrapper.classList.toggle('hidden')

        const seshWrapper = newSessionDiv.current
        seshWrapper.classList.toggle('hidden')
    }

    const numberOfAttempts = useRef(1)
    const send = useRef("")
    const constructBoulder = (grade) => {
        let sentBool=false
        if (send.current.checked === true) {
            sentBool=true
        }
        const boulderObject = {
            sessionId: currentSession.id,
            grade: grade,
            attempts: parseInt(numberOfAttempts.current.value),
            sent: sentBool
        }
        addBoulder(boulderObject)
    }
    const currentSessionBoulders = boulders.filter(boulder => boulder.sessionId === currentSession.id) || []
    const arrayOfGrades = [0,1,2,3,4,5,6,7,8,9]
    return (
        <>
        <div ref={newBoulderDiv} className="hidden">
            <div className="sessionLogHeader">Session Log</div>
            <div className="instruct newSeshInstruct">New Boulder:</div>
            <form>
                <div className="sessionRow">
                    <label htmlFor="numberOfAttempts">Number of Attempts: </label>
                    <input
                        type="number"
                        id="numberOfAttempts"
                        inputmode="numeric"
                        pattern="[0-9]*"
                        ref={numberOfAttempts}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="1"
                        defaultValue="1"
                    />
                </div>
                <div className="sessionRow">
                    <label htmlFor="sentCheckbox">Sent: </label>
                    <input
                        type="checkbox"
                        id="sentCheckBox"
                        ref={send}
                        required
                        autoFocus
                        className="form-control"
                        placeholder=""
                    />
                </div>
                <div className="instruct  newSeshInstruct">Click Grade Below To Submit:</div>
                <div className="btnContainer">
                    {
                        arrayOfGrades.map(grades => <NewBoulderButton className="gradeBtn" constructBoulder={constructBoulder} grade={grades}/>)
                    }
                </div>
            </form>
            <div className="newSessionLog">
                <div className="logHeader">Logged Boulders</div>
                <div className="newSessionLog_boulders">
                {
                    currentSessionBoulders.map(boulder => <CurrentSessionBoulder boulder={boulder}/>)
                }
                </div>
                <div className="submitSession">
                    <div className="saveSessionBtn" onClick={(evt) =>{
                        evt.preventDefault()
                        props.setActiveList("mySessions")
                    }}>Save Session</div>
                </div>
            </div>
        </div>
        <div ref={newSessionDiv}>
            <NewSessionForm currentUserId={currentUserId} handleClick={handleClick} />
        </div>
        </>
    )
}