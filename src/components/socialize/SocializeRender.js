import React, {useState, useContext, useEffect, useRef} from "react"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import "./Socialize.css"
import FindFriendsList from "./FindFriendsList"
import { UserContext } from "../users/UserProvider"
import { FollowsContext} from "./FollowProvider"
import { BouldersContext } from "../boulders/BoulderProvider"
import { SessionsContext } from "../mySessions/SessionProvider"
import LeaderBoardItem from "./LeaderBoardItem"
import FollowingRender from "./FollowingRender"
import FollowersRender from "./FollowersRender"
import FollowingStats from "./FollowingStats"


export default () => {
    const { users, usersFollowing, setUsersFollowing, currentFollowers, setCurrentFollowers } = useContext(UserContext)
    const { follows } = useContext(FollowsContext)
    const { boulders } = useContext(BouldersContext)
    const { sessions } = useContext(SessionsContext)
    const followersRef = useRef()
    const followingRef = useRef()
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

    let counter = 0
    // controlling home vs. stats
    const [activeList, setActiveList] = useState("following")
    const [components, setComponents] = useState()

    const showHome = () => (
        <FollowingRender usersFollowing={usersFollowing} />
    )

    const showStats = () => (
        <FollowersRender currentFollowers={currentFollowers}/>
        )

    useEffect(() => {
        if (activeList === "home") {
            setComponents(showHome)
        }
        if (activeList === "followers") {
            setComponents(showStats)
        }
    }, [activeList])

    //end control

    const [view, setView] = useState(false)
    const toggleView = () => setView(!view)

    const handleClick = () => {
        const wrapper = followersRef.current
        wrapper.classList.toggle('hidden')

        const seshWrapper = followingRef.current
        seshWrapper.classList.toggle('hidden')
    }

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
                if (view === true) {
                    handleClick()
                    toggleView()
                }
                // setActiveList("following")
            }}>Following</button>
            <button  onClick={(e) => {
                e.preventDefault()
                if (view === false) {
                    handleClick()
                    toggleView()
                }
                // setActiveList("followers")
            }}>Followers</button>
        </div>
        {/* {components} */}
        <div ref={followingRef} className="followingContainer">
                <div className="following">Following ({usersFollowing.length})</div>
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
            <div className="followers">Followers ({currentFollowers.length})</div>
            <div className="followersList">
                {
                    currentFollowers.map(user => {
                        return (
                        <div>{user.name}</div>
                        )
                    })
                }
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
        <div>

        </div>

        </>
    )
}