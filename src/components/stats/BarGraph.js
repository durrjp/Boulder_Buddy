import React, { useContext } from "react"
import Chart from "chart.js"
import { SessionsContext } from "../mySessions/SessionProvider"

export default (props) => {
    // number of attempts for each grade vs number of sends per grade
    const {sessions} = useContext(SessionsContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const currUserSessions = sessions.filter(session => session.userId === currentUserId)

    
    return (
        new Chart({
            type:'bar',
            data: {
                labels: grades,
                datasets: [
                    {
                        label: "Attempts",
                        barPercentage: 0.5,
                        fill: false,
                        backgroundColor: backgroundColorArray,
                        barThickness: 6,
                        maxBarThickness: 8,
                        minBarLength: 2,
                        data: attempts
                    },
                    {
                        label: "Sends",
                        barPercentage: 0.5,
                        fill: false,
                        backgroundColor: backgroundColorArray,
                        barThickness: 6,
                        maxBarThickness: 8,
                        minBarLength: 2,
                        data: sends
                    }
                ]
            }
        })
    )
}