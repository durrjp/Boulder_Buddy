import React, { useContext } from "react"
import { SessionsContext } from "../mySessions/SessionProvider"
import {Bar} from 'react-chartjs-2';
import { BouldersContext } from "../boulders/BoulderProvider";


export default (props) => {
    // number of attempts for each grade vs number of sends per grade
    const {sessions} = useContext(SessionsContext)
    const {boulders} = useContext(BouldersContext)
    let currentUserId = ""
    if (props.user === undefined) {
        currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    } else {
        currentUserId = props.user.id
    }
    const currUserSessions = sessions.filter(session => session.userId === currentUserId)
    const currUserSessionIdsArray = currUserSessions.map(cus => {
        return cus.id
    })
    const userBoulders = boulders.filter(boulder => {
        return currUserSessionIdsArray.includes(boulder.sessionId)
    })
    const totalBoulderAttemptsData = {}
    userBoulders.map(userBoulder => {
        if (!totalBoulderAttemptsData.hasOwnProperty(userBoulder.grade)) {
            totalBoulderAttemptsData[userBoulder.grade] = userBoulder.attempts
        } else {
            totalBoulderAttemptsData[userBoulder.grade] += userBoulder.attempts
        }
    })

    const totalBoulderSends = {}
    userBoulders.map(userBoulder => {
        if(userBoulder.sent === true) {
            if (!totalBoulderSends.hasOwnProperty(userBoulder.grade)) {
                totalBoulderSends[userBoulder.grade] = 1
            } else {
                totalBoulderSends[userBoulder.grade] += 1
            }
        }
    })

    let orderedAttempts = []
    for (const grade in totalBoulderAttemptsData) {
        orderedAttempts.push([grade,totalBoulderAttemptsData[grade]])
    }

    let orderedSends = []
    for (const grade in totalBoulderAttemptsData) {
        orderedSends.push([grade,totalBoulderSends[grade]])
    }

    const gradeArray = []
    orderedAttempts.map(grade => gradeArray.push(`V${grade[0]}`))

    const attemptsArray= []
    orderedAttempts.map(grade => attemptsArray.push(grade[1]))

    const sendsArray = []
    orderedSends.map(grade => sendsArray.push(grade[1]))

    let attemptsColorArray= []
    orderedAttempts.forEach(grade => {
        attemptsColorArray.push("rgb(107,53,17,.4)")
    });

    let sendsColorArray= []
    orderedSends.forEach(grade => {
        sendsColorArray.push("rgb(253,141,110,1)")
    });
    
    let state = {
        data: {
            labels: gradeArray,
            datasets: [
                {
                    label: "Attempted",
                    backgroundColor: attemptsColorArray,
                    data: attemptsArray,
                    xAxisID: "bar-x-axis1",
                    barThickness: 17
                },
                {
                    label: "Completed",
                    backgroundColor: sendsColorArray,
                    data: sendsArray,
                    xAxisID: "bar-x-axis1",
                    barThickness: 25

                }
            ]
        }
    }
    return (
        <Bar
            data={state.data}
            options={{
                aspectRatio: 1,
                scales: {
                    xAxes: [{
                        id: "bar-x-axis1",
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                            offsetGridLines: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Grade",
                            fontsize: 15,
                            padding: 4
                        },
                        stacked: true,
                        categoryPercentage: 0.5,
                        barPercentage: 0.5
                    },
                    ],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Attempts",
                            fontsize: 15,
                        },
                        stacked: false,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    labels: {
                        color: '#6B3411',
                        fontSize: 15
                    }
                }
            }}
            height={500} width={340}
        />
    )
}