import React, { useContext, useState } from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import EditCurrentBoulderForm from "../newSessions/EditCurrentBoulderForm"
import { BouldersContext } from "../boulders/BoulderProvider"
import "./MySessions.css"


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
            
            <div className="boulderItem1">V{boulder.grade}</div>
            <div className="boulderItem2">Attempts: {boulder.attempts}</div>
            <div className="boulderItem3">{sended}</div>
            <div className="boulderItem4" >
            <button className="editButton" onClick={(e) => {
                e.preventDefault()
                toggle()
            }}>Edit</button>
            </div>
            <div className="boulderItem5" >
            <button className="deleteButton" onClick={(e) => {
                e.preventDefault()
                deleteBoulder(boulder.id)

            }}>X</button>
            </div>
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