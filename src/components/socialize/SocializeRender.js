import React, {useState, useContext, useEffect} from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "./Socialize.css"
import FindFriendsList from "./FindFriendsList"
import { UserContext } from "../users/UserProvider"
import { FollowsContext } from "./FollowProvider"

export default () => {
    const { users, usersFollowing, setUsersFollowing } = useContext(UserContext)
    const { follows } = useContext(FollowsContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const notCurrentUsers = users.filter(user => user.id !== currentUserId)
    const [activeSocList, setActiveSocList] = useState("home")
    const [socComponents, setSocComponents] = useState()
    const usersFollowingArray = notCurrentUsers.filter(user => {
        if (follows.some(follow => user.id === follow.userFollowingId && follow.userId === currentUserId)) {
            return true
        } else {
            return false
        }
    }) || []

    useEffect(() => {
        setUsersFollowing(usersFollowingArray)
    },[])

    useEffect(() => {
        setUsersFollowing(usersFollowingArray)
    },[follows])

    return (
        <>
        <div className="socializeHeader">Socialize</div>
        <div className="addFriendsBtnContainer">
            <button className="addFriendsBtn" onClick={(e) => {
                e.preventDefault()
                toggle()

            }}>Find Friends</button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <div className="findFriendsHeader">
                        Find Friends
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FindFriendsList />
                </ModalBody>
            </Modal>
        </div>
        <div className="Following">Following</div>
        <div>
            {
                usersFollowing.map(user => {
                    return (
                    <div>{user.name}</div>
                    )
                })
            }
        </div>

        </>
    )
}