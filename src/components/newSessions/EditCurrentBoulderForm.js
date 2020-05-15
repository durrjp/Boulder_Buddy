import React, {useContext, useState, useEffect} from "react"
import { BouldersContext } from "../boulders/BoulderProvider"



export default ({boulder, toggle}) => {
    const { updateBoulder } = useContext(BouldersContext)

    const [updatedBoulder, setBoulder] = useState(boulder)
    const [sent, setSent] = useState()

    useEffect(()=> {
        setSent(boulder.sent)
    },[])

    useEffect(()=> {
        setSent(updatedBoulder.sent)
    },[updatedBoulder])


    const handleControlledInputChange = (event) => {
        if (event.target.name === "sent") {
            const newBoulder = Object.assign({}, updatedBoulder)
            newBoulder[event.target.name] = event.target.checked
            setBoulder(newBoulder)
        } else {
            const newBoulder = Object.assign({}, updatedBoulder)
            newBoulder[event.target.name] = event.target.value
            setBoulder(newBoulder)
        }
    }
    const gradeArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const editBoulder = () => {
        updateBoulder({
            id:updatedBoulder.id,
            sessionId: updatedBoulder.sessionId,
            grade: parseInt(updatedBoulder.grade),
            attempts: parseInt(updatedBoulder.attempts),
            sent: updatedBoulder.sent
        })
        .then(toggle)
    }
    return (
    <>
        <form className="editBoulderForm">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Grade">Grade: </label>
                    <select name="grade" className="form-control"
                        defaultValue={boulder.grade}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a grade</option>
                        {gradeArray.map(grade => (
                            <option key={grade} value={grade}>
                                V{grade}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfAttempts">Number of Attempts: </label>
                    <input
                        type="number"
                        name="attempts"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Number of Attempts"
                        defaultValue={boulder.attempts}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="sentCheckbox">Sent: </label>
                    <input
                        type="checkbox"
                        id="sentCheckBox"
                        name="sent"
                        required
                        autoFocus
                        className="form-control"
                        placeholder=""
                        checked = {sent}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <div className="editBtnContainer">
                <button type="submit" className="saveEditBtn"
                    onClick={evt => {
                        evt.preventDefault()
                        editBoulder()
                    }}>
                    Save Edit
                </button>
            </div>
        </form>
    </>
    )
}