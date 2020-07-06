import React, {useState, useContext, useEffect, useRef} from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "./Socialize.css"
import "./Table.css"
import FindFriendsList from "./FindFriendsList"
import { UserContext } from "../users/UserProvider"
import { FollowsContext} from "./FollowProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { SessionsContext } from "../mySessions/SessionProvider"
import LeaderBoardItem from "./LeaderBoardItem"
import FollowingStats from "./FollowingStats"
import {ReactComponent as Socialize} from "../home/homeImages/friends.svg"

export default () => {
    const { users, usersFollowing, setUsersFollowing, currentFollowers, setCurrentFollowers } = useContext(UserContext)
    const { follows, deleteFollow } = useContext(FollowsContext)
    const { boulders } = useContext(BouldersContext)
    const { sessions } = useContext(SessionsContext)
    const followersRef = useRef()
    const followingRef = useRef()
    const followersBtn = useRef()
    const followingBtn  = useRef()
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
    },[follows, users])

    useEffect(() => {
        setUsersFollowing(usersFollowingArray)
    },[follows, users])
    
    //sorting the boulders highest to lowest
    const bouldersSent = boulders.filter(boulder => boulder.sent === true)    
    
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



    const userData = []
    users.map(user => {
        const userSessions = sessions.filter(session => session.userId === user.id)
        const arrayOfBoulders = userSessions.map(session => {
            return boulders.filter(boulder => boulder.sessionId === session.id)
        })
        const flatBouldersArray = arrayOfBoulders.flat()
        const sentFlatBoudlersArray = flatBouldersArray.filter(boulder => boulder.sent === true)
        const sortedBoulders = sentFlatBoudlersArray.sort((a,b) => {
            var gradeA = a.grade
            var gradeB = b.grade
            
            if (gradeA > gradeB) {
                return -1
            }
            if (gradeA < gradeB) {
                return 1
            }
            return 0
        })
        if (sortedBoulders.length !== 0) {
            const highestGrade = sortedBoulders[0].grade
            const numberOfHighGradesSent = sortedBoulders.filter(boulder => boulder.grade === highestGrade)
            const object = {
                userName: user.name,
                highestGrade: highestGrade,
                sends: numberOfHighGradesSent.length
            }
            userData.push(object)
        }
    })
    const sortedUserData = userData.sort((a,b) => {
        var highestGradeA = a.highestGrade
        var highestGradeB = b.highestGrade
        var sendsA = a.sends
        var sendsB = b.sends
        
        if (highestGradeA > highestGradeB) {
            return -1
        }
        if (highestGradeA < highestGradeB) {
            return 1
        }
        if (sendsA > sendsB) {
            return -1
        }
        if (sendsA < sendsB) {
            return 1
        }
        return 0
    })
    const top5Climbers = sortedUserData.slice(0, 5).map((user => {
        return user
    }))
    // end

    // toggle for following vs. followers
    const [view, setView] = useState(false)
    const toggleView = () => setView(!view)

    const handleClick = () => {
        const wrapper = followersRef.current
        wrapper.classList.toggle('hidden')
        wrapper.classList.toggle('selected')

        const seshWrapper = followingRef.current
        seshWrapper.classList.toggle('hidden')
        wrapper.classList.toggle('selected')
    }

    const handleColorChange = () => {
        const wrapper = followersBtn.current
        wrapper.classList.toggle('selected')

        const otherWrapper = followingBtn.current
        otherWrapper.classList.toggle('selected')

    }

    //end

    let counter = 0

    return (
            <>
        <div className="leaderboardContainer">
            <div className="tableHeader">Leaderboard</div>
            <table className="leaderBoardTable">
                <thead>
                    <tr>
                        <th>Rank:</th>
                        <th>Climber:</th>
                        <th>Highest Grade:</th>
                        <th>Sends:</th>
                    </tr>
                </thead>
                <tbody>
            {
                top5Climbers.map(user=> {
                    counter+=1
                    return (
                    <LeaderBoardItem counter={counter} user={user}/>
                    )

                })
            }
                </tbody>
            </table>
        </div>
        <div className="btnsContainer">
            <button ref={followingBtn} className="followingTogBtn selected" onClick={(e) => {
                e.preventDefault()
                if (view === true) {
                    handleClick()
                    handleColorChange()
                    toggleView()
                }
            }}>Following</button>
            <button ref={followersBtn} className="followersTogBtn"  onClick={(e) => {
                e.preventDefault()
                if (view === false) {
                    handleClick()
                    handleColorChange()
                    toggleView()
                }
            }}>Followers</button>
        </div>
        <div ref={followingRef} className="followingContainer">
                <div className="following"><span className="total">Total:</span> {usersFollowing.length}</div>
                <div className="followingList">
                    {
                        usersFollowing.map(user => {
                            return (
                            <>
                            <FollowingStats user={user}/>
                            </>
                            )
                        })
                    }
                </div>
        </div>
        <div ref={followersRef} className="followersContainer hidden">
            <div className="followers"><span className="total">Total:</span> {currentFollowers.length}</div>
            <div className="followersList">
                {
                    currentFollowers.map(user => {
                        const followRelationship = follows.find(follow => {
                            return user.id === follow.userId && follow.userFollowingId === currentUserId
                        })

                        const deleteTheFollow = () => {
                            deleteFollow(followRelationship.id)
                        }
                        return (
                        <div className="followingStatsContainer">
                            <Socialize className="friend_Icon"/>
                            <div className="friendName">{user.name}</div>
                            <button className="blockUserBtn" onClick={deleteTheFollow}>Block</button>
                        </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="addFriendsBtnContainer">
            <button className="addFriendsBtn" onClick={(e) => {
                e.preventDefault()
                toggle()

            }}>Find Climbers</button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <div className="findFriendsHeader">
                        Find Climbers
                    </div>
                </ModalHeader>
                <ModalBody>
                    <FindFriendsList />
                </ModalBody>
            </Modal>
        </div>
        <div>

        </div>

        </>
    )
}