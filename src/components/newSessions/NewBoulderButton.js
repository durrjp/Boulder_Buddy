import React from "react"
import "./Log.css"

export default ({grade, constructBoulder}) => {
    return (
        <div className="gradeBtn" type="submit"
            onClick={
                evt => {
                    evt.preventDefault()
                    constructBoulder(grade)
                }
            }
            >
            V{grade}
        </div>
    )
}