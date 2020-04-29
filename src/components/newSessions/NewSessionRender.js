import React, { useRef, useContext, useState } from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import NewSessionForm from "../newSessions/NewSessionForm"
import CurrentSessionBoulder from "./CurrentSessionBoulder"
import { SessionsContext } from "../mySessions/SessionProvider"
import { BouldersContext } from "../boulders/BoulderProvider"


export default (props) => {
    const { currentSession } = useContext(SessionsContext)
    const { boulders, addBoulder } = useContext(BouldersContext)

    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))

    const [ modal, setModal ] = useState(true)
    const toggle = () => setModal(!modal)

    const numberOfAttempts = useRef(1)
    const send = useRef("")
    const constructBoulder = (grade) => {
        let sentBool=false
        if (send.current.value === "on") {
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
    return (
        <>
        <div>Session # {currentSession.id}</div>
        <form>
            <label htmlFor="numberOfAttempts">Number of Attempts: </label>
            <input
                type="number"
                id="numberOfAttempts"
                ref={numberOfAttempts}
                required
                autoFocus
                className="form-control"
                placeholder="1"
            />
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
            <button type="submit"
                id="0"
                onClick={
                    evt => {
                        evt.preventDefault()
                        constructBoulder(0)
                    }
                }
                className="btn v0">
                V0
            </button>
        </form>
        <div className="newSessionLog">
            <h2>Log</h2>
        {
            currentSessionBoulders.map(boulder => <CurrentSessionBoulder boulder={boulder}/>)
        }
        </div>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                New Session
            </ModalHeader>
            <ModalBody>
                <NewSessionForm toggle={toggle} currentUserId={currentUserId} />
            </ModalBody>
        </Modal>
        </>
    )
}