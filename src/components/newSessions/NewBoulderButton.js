import React from "react"
import {Button} from "reactstrap"

export default ({grade, constructBoulder}) => {
    return (
        <Button type="submit"
            onClick={
                evt => {
                    evt.preventDefault()
                    constructBoulder(grade)
                }
            }
            className="btn">
            V{grade}
        </Button>
    )
}