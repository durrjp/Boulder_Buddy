import React, { useContext, useState, useRef } from "react"
import { BouldersContext } from "../boulders/BoulderProvider"
import MySessionsBoulder from "./MySessionsBoulder"
import "./MySessions.css"
import { SessionsContext } from "./SessionProvider"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import NewBoulderButton from "../newSessions/NewBoulderButton"


export default (props) => {
    const {boulders, addBoulder} = useContext(BouldersContext)
    const {deleteSession} = useContext(SessionsContext)
    const sessionBoulderArray = boulders.filter(boulder => boulder.sessionId === props.session.id)
    const [yyyy, mm, dd] = props.session.date.split("-")
    const fixedDate = `${mm}/${dd}/${yyyy}`
    const sortedBoulders = sessionBoulderArray.sort((a,b) => b.grade - a.grade)
    const send = useRef("")
    const numberOfAttempts = useRef(1)

    const deleteSessionFunc = (thisSeshId) => {
        deleteSession(thisSeshId)
    }

    const [modal, setModal] = useState(false)
    const toggle = () => {
        setModal(!modal)
    }

    const constructBoulder = (grade) => {
        let sentBool=false
        if (send.current.checked === true) {
            sentBool=true
        }
        const boulderObject = {
            sessionId: props.session.id,
            grade: grade,
            attempts: parseInt(numberOfAttempts.current.value),
            sent: sentBool
        }
        addBoulder(boulderObject)
    }
    const arrayOfGrades = [0,1,2,3,4,5,6,7,8,9]


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
            <div>
                <button className="addBoulderBtn" onClick={toggle}>Add Boulders</button>
            </div>
            <Modal className="friendStatsModal" isOpen={modal} >
                    <ModalHeader toggle={toggle}>Add Boulder
                    </ModalHeader>
                    <ModalBody>
                    <form>
                        <div className="sessionRow">
                            <label className="attemptsLabel" htmlFor="numberOfAttempts">Attempts: </label>
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
                    </ModalBody>
            </Modal>
        </div>
        </>
    )
}