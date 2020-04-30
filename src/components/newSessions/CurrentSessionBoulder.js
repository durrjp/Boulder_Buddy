import React, { useState, useContext } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import EditCurrentBoulderForm from "./EditCurrentBoulderForm"
import { BouldersContext } from "../boulders/BoulderProvider"



export default (props) => {
    const { deleteBoulder } = useContext(BouldersContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    let sended = ""
    if (props.boulder.sent) {
        sended = "sent"
    } else {
        sended = "not sent"
    }
    return (
    <>
        <div className="singleBoulder">
        <div>V{props.boulder.grade}</div>
        <div>Attempts: {props.boulder.attempts}</div>
        <div>{sended}</div>
        <Button onClick={(e) => {
            e.preventDefault()
            toggle()
        }}>Edit</Button>
        <Button onClick={(e) => {
            e.preventDefault()
            deleteBoulder(props.boulder.id)

        }}>X</Button>
        </div>
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