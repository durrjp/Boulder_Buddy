import React from "react"

export default (props) => {
    return (
    <>
        <div className="currentBoulder">
            <div>V{props.boulder.grade}</div>
            <div>Attempts: {props.boulder.attempts}</div>
            <div>{props.boulder.sent}</div>
        </div>
    </>
    )
}