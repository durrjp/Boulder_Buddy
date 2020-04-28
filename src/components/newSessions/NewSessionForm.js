import React from "react"
import {Button} from "reactstrap"

export default (props) => {
    return (
        <>
        <Button onClick={() => props.setActiveList("newSession")}>Start Session</Button>
        </>
    )
}