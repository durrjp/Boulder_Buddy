import React, { useContext, useState } from "react"
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap"
import EditCurrentBoulderForm from "../newSessions/EditCurrentBoulderForm"
import { BouldersContext } from "../boulders/BoulderProvider"

export default ({boulder}) => {
    const { deleteBoulder } = useContext(BouldersContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    let sended=""
    if (boulder.sent === true) {
        sended = "Sent"
    } else {
        sended = "Not Sent"
    }
    return (
        <>
        <div className="singleBoulder">
            
            <div>V{boulder.grade}</div>
            <div>Attempts: {boulder.attempts}</div>
            <div>{sended}</div>
            <Button onClick={(e) => {
                e.preventDefault()
                toggle()
            }}>Edit</Button>
            <Button onClick={(e) => {
                e.preventDefault()
                deleteBoulder(boulder.id)

            }}>X</Button>
            <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                        Edit Boulder
                    </ModalHeader>
                    <ModalBody>
                        <EditCurrentBoulderForm boulder={boulder} toggle={toggle} />
                    </ModalBody>
                </Modal>
        </div>
        </>
    )
}