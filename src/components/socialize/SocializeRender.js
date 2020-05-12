import React, {useState, useContext, useEffect} from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "./Socialize.css"
import FindFriendsList from "./FindFriendsList"
import { UserContext } from "../users/UserProvider"
import { FollowsContext, FollowsProvider } from "./FollowProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { SessionsContext } from "../mySessions/SessionProvider"
import LeaderBoardItem from "./LeaderBoardItem"
import FollowingRender from "./FollowingRender"
import { UserProvider } from "../users/UserProvider"
import { SessionsProvider } from "../mySessions/SessionProvider"
import { BouldersProvider } from "../boulders/BoulderProvider"
import FollowersRender from "./FollowersRender"

export default ({setMainComponents, showStats}) => {
    const { users, usersFollowing, setUsersFollowing, currentFollowers, setCurrentFollowers } = useContext(UserContext)
    const { follows } = useContext(FollowsContext)
    const { boulders } = useContext(BouldersContext)
    const { sessions } = useContext(SessionsContext)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const notCurrentUsers = users.filter(user => user.id !== currentUserId)


    // creating arrays for users following and users not following
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
    },[follows, users])
    
    //sorting the boulders highest to lowest
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
    
    
    const top10Boulders = sortedBoulders.slice(0, 5).map((boulder => {
        return boulder
    }))
    
    const child   = { width: `414px`, height: `340px`}
    const parent  = { width: `900px`, height: `340px`}
    
    
    let counter = 0
    // controlling following vs. followers
    const [activeList, setActiveList] = useState("following")
    const [components, setComponents] = useState()
    
    const showFollowing = () => (
        <FollowingRender usersFollowing={usersFollowing} />
    )
    
    const showFollowers = () => (
        <FollowersRender currentFollowers={currentFollowers}/>
        )
    //test
    
    //test

    useEffect(() => {
        if (activeList === "following") {
            setComponents(showFollowing)
        }
        if (activeList === "followers") {
            setComponents(showFollowers)
        }
        
    }, [activeList])
    return (
            <>
        <div className="leaderboardContainer">
            <div className="tableHeader">Leaderboard</div>
            <table className="leaderBoardTable">
                <thead>
                    <tr>
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
        <div>
            <button onClick={(e) => {
                e.preventDefault()
                setActiveList("following")
            }}>Following</button>
            <button  onClick={(e) => {
                e.preventDefault()
                setActiveList("followers")
            }}>Followers</button>
        </div>
        {components}
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