import React, { useContext, useRef } from "react"
import {Button} from "reactstrap"
import { SessionsContext } from "../mySessions/SessionProvider"
import "./NewSessionForm.css"

export default (props) => {
    const date = useRef()
    const location = useRef()
    const { addSession, setCurrentSession } = useContext(SessionsContext)

    const constructNewSession = () => {
        const newSessionObject = {
            userId: props.currentUserId,
            date: date.current.value,
            location: location.current.value
        }
        addSession(newSessionObject).then((res) => {
            setCurrentSession(res)
        })
    }

    return (
        <>
        <form className="newSessionForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="newSessionDate">Date </label>
                    <input
                        type="date"
                        id="newSessionDate"
                        ref={date}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="session date"
                        defaultValue=
                        {
                            Date.now()
                        }
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
                    />
                </div>
            </fieldset>

            <Button type="submit"
                onClick={(e) => {
                    e.preventDefault()
                    constructNewSession()
                    props.handleClick()
                } }>Start Session</Button>
        </form>
        </>
    )
}