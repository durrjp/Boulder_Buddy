import React from "react"
import {Pie} from "react-chartjs-2"


export default ({pieGrade, userBoulders}) => {
    console.log(pieGrade)
    const pieGradeBoulders = userBoulders.filter(boulder => boulder.grade === parseInt(pieGrade))
    let pieGradeAttempts = {
        notSent: 0,
        sent: 0,
        flashed: 0
    }
    pieGradeBoulders.map(boulder => {
        if (boulder.sent === true && boulder.attempts === 1) {
            pieGradeAttempts.flashed += 1
        } else if (boulder.sent === true && boulder.attempts > 1) {
            pieGradeAttempts.sent += 1
        } else if (boulder.sent === false) {
            pieGradeAttempts.notSent += 1
        }
    })
    const pieGradeTotal = pieGradeAttempts.notSent + pieGradeAttempts.sent + pieGradeAttempts.flashed
    let pieGradeData = {
        notSent: pieGradeAttempts.notSent/pieGradeTotal * 100,
        sent: pieGradeAttempts.sent/pieGradeTotal * 100,
        flashed: pieGradeAttempts.flashed/pieGradeTotal * 100

    }
    const pieData = Object.values(pieGradeData)
    let pieDataRounded = []
    pieData.map(item => {
        pieDataRounded.push(Math.floor(parseInt(item)))
    })

    let state = {
        data: {
            labels: ["Incomplete %", "Complete %", "Flashed %"],
            datasets: [
                {
                    label: "Attempts",
                    fill: false,
                    backgroundColor: ["rbg(0,0,0,.8)", "rgb(107,53,17,.8)", "rgb(253,141,110,.7)"] ,
                    barThickness: 'flex',
                    maxBarThickness: 20,
                    minBarLength: 2,
                    data: pieDataRounded
                }
            ],
        }
    }

    return (
        <>
        <Pie 
            data={state.data}
            options= {{
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                }
            }}
        />
        <div className="pieChartAttempts">V{pieGrade} attempts: {pieGradeTotal}</div>
        </>

    )
}