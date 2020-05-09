import React, {useState, useContext, useEffect} from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "./Socialize.css"
import FindFriendsList from "./FindFriendsList"
import { UserContext } from "../users/UserProvider"
import { FollowsContext } from "./FollowProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { SessionsContext } from "../mySessions/SessionProvider"
import LeaderBoardItem from "./LeaderBoardItem"

export default () => {
    const { users, usersFollowing, setUsersFollowing, currentFollowers, setCurrentFollowers } = useContext(UserContext)
    const { follows } = useContext(FollowsContext)
    const { boulders } = useContext(BouldersContext)
    const { sessions } = useContext(SessionsContext)
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

    const currentFollowersArray = notCurrentUsers.filter(user => {
        if(follows.some(follow => user.id === follow.userId && follow.userFollowingId === currentUserId)) {
            return true
        } else {
            return false
        }
    })

    useEffect(() => {
        setCurrentFollowers(currentFollowersArray)
    },[])

    useEffect(() => {
        setCurrentFollowers(currentFollowersArray)
    },[follows])

    useEffect(() => {
        setUsersFollowing(usersFollowingArray)
    },[])

    useEffect(() => {
        setUsersFollowing(usersFollowingArray)
    },[follows])

    const bouldersSent = boulders.filter(boulder => boulder.sent === true)
    const sortedArray= bouldersSent.sort((a,b) => b.grade - a.grade)

   
    const sortedBoulders = bouldersSent.sort((a,b) => {
        var gradeA = a.grade
        var gradeB = b.grade
        var attemptsA = a.attempts
        var attemptsB = b.attempts
    
        if (gradeA > gradeB) {
            return -1
        }
        if (gradeA < gradeB) {
            return 1
        }
        if (attemptsA > attemptsB) {
            return 1
        }
        if (attemptsA < attemptsB) {
            return -1
        }
        return 0
    })


    const top10Boulders = sortedBoulders.slice(0, 10).map((boulder => {
        return boulder
    }))
    

    let counter = 0

    return (
        <>
        <div className="socializeHeader">Socialize</div>
        <div className="leaderboardContainer">
            <div className="tableHeader">Top 10 Climbs - All Time</div>
            <table className="leaderBoardTable">
                <thead>
                    <tr className="filled">
                        <th>Rank:</th>
                        <th>Climber:</th>
                        <th>Grade:</th>
                        <th>Attempts:</th>
                        <th>Location:</th>
                    </tr>
                </thead>
                <tbody>
            {
                top10Boulders.map(boulder=> {
                    const currSesh = sessions.find(session => session.id === boulder.sessionId) || {}
                    const currUser = users.find(user => user.id === currSesh.userId) || {}
                    counter+=1
                    return (
                    <LeaderBoardItem counter={counter} boulder={boulder} currSesh={currSesh} currUser={currUser} />
                    )

                })
            }
                </tbody>
            </table>
        </div>
        <div className="follows">
            <div className="followingRow">
        <div className="following">Following ({usersFollowing.length})</div>
                <div>
                    {
                        usersFollowing.map(user => {
                            return (
                            <div>{user.name}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="followersRow">
                <div className="followers">Followers ({currentFollowers.length})</div>
                <div>
                    {
                        currentFollowers.map(user => {
                            return (
                            <div>{user.name}</div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
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

        </>
    )
}