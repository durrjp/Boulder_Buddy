import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import EditCurrentBoulderForm from "./EditCurrentBoulderForm"
import { BouldersContext } from "../boulders/BoulderProvider"



export default (props) => {
    const [modal, setModal] = useState(false)
    const { deleteBoulder } = useContext(BouldersContext)
    const toggle = () => setModal(!modal)

    let sended = ""
    if (props.boulder.sent) {
        sended = "sent"
    } else {
        sended = "not sent"
    }
    return (
    <>
        <div className="singleBoulderLog">
            <div className="currentBoulder">
                <div>V{props.boulder.grade}</div>
                <div>Attempts: {props.boulder.attempts}</div>
                <div>{sended}</div>
            </div>
        </div>
        <Button onClick={(e) => {
            e.preventDefault()
            toggle()
        }}>Edit</Button>
        <Button onClick={(e) => {
            e.preventDefault()
            deleteBoulder(props.boulder.id)

        }}>X</Button>
        <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    Edit Boulder
                </ModalHeader>
                <ModalBody>
                    <EditCurrentBoulderForm boulder={props.boulder} toggle={toggle} />
                </ModalBody>
            </Modal>
    </>
    )
}