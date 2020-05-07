import React, { useContext, useRef, useState } from "react"
import { SessionsContext } from "../mySessions/SessionProvider"
import "./NewSessionForm.css"
import { Alert } from "reactstrap"
import moment from "moment"

export default (props) => {
    const date = useRef()
    const location = useRef()
    const { addSession, setCurrentSession } = useContext(SessionsContext)
    const [show, setShow] = useState(false);
    const toggleShowLocationAlert = () => setShow(!show)

    const constructNewSession = () => {
        const newSessionObject = {
            userId: props.currentUserId,
            date: date.current.value,
            location: location.current.value
        }
        addSession(newSessionObject).then((res) => {
            console.log(res)
            setCurrentSession(res)
        })
    }
    var today = moment().format('YYYY-MM-DD')
    return (
        <>
        <div className="newSessionHeader">
            New Session
        </div>
        <form className="newSessionForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="newSessionDate">Session Date: </label>
                    <input
                        type="date"
                        id="newSessionDate"
                        ref={date}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="session date"
                        defaultValue = {today}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="newSessionLocation">Location: </label>
                    <input
                        type="text"
                        id="newSessionLocation"
                        ref={location}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Ex. Bob's Bouldering Gym"
                    />
                </div>
            </fieldset>

        </form>
        <div className="buttonHolder">
            <button className="newSeshBtn" type="submit"
                    onClick={(e) => {
                        e.preventDefault()
                        if (location.current.value !== "") {
                            constructNewSession()
                            props.handleClick()
                        } else {
                            toggleShowLocationAlert()
                        }
                    }}
            >Start Session</button>
        </div>
        <div className="locationAlertContainer">
            <Alert color="danger" isOpen={show} toggle={toggleShowLocationAlert} dismissible>
                                            Please enter location
            </Alert>
        </div>
        </>
    )
}