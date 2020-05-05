import React, {useState} from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "./Socialize.css"
import FindFriendsList from "./FindFriendsList"

export default () => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [activeSocList, setActiveSocList] = useState("home")
    const [socComponents, setSocComponents] = useState()

    return (
        <>
        <div className="socializeHeader">Socialize</div>
        <button onClick={(e) => {
            e.preventDefault()
            toggle()

        }}>Find Friends</button>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Find Friends
            </ModalHeader>
            <ModalBody>
                <FindFriendsList />
            </ModalBody>
        </Modal>

        </>
    )
}