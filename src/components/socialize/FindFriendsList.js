import React, { useContext } from "react"
import { FollowsContext } from "./FollowProvider"

export default () => {
    const { follows } = useContext(FollowsContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    

    return (
        <div></div>
    )
}