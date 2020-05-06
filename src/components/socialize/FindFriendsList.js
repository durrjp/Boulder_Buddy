import React, { useContext, useRef, useEffect } from "react"
import { FollowsContext } from "./FollowProvider"
import { UserContext } from "../users/UserProvider"
import Person from "./Person"

export default (props) => {
    const { follows, addFollow } = useContext(FollowsContext) || []
    const { users, setSearchTerm, searchTerm, filteredUsers, setFiltered } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const search = useRef("")
    const notCurrentUsers = users.filter(user => user.id !== currentUserId)

    // array of users not followed
    const usersNotFollowing = notCurrentUsers.filter(user => {
        if (follows.some(follow => user.id === follow.userFollowingId && follow.userId === currentUserId)) {
            return false
        } else {
            return true
        }
    })

    useEffect(() => {
        setFiltered(usersNotFollowing)
    },[])

    useEffect(() => {
        setFiltered(usersNotFollowing)
    },[follows])

    // only if search is done, update filtered users
    useEffect(() => {
        if (search.current.value !== "") {
            const subset = filteredUsers.filter(user => user.name.toLowerCase().includes(searchTerm))
            setFiltered(subset)
        } else if (filteredUsers !== []) {
            setFiltered(usersNotFollowing)
        }
    }, [searchTerm])

    const constructFollow = (userToFollow) => {
        const followObject = {
            userId: currentUserId,
            userFollowingId: userToFollow.id,
        }
        addFollow(followObject)
    }
    
    return (
        <div className="searchUsers">
            <div className="searchBar">
                <input
                    type="text"
                    ref={search}
                    className="inputSearch"
                    onKeyUp={ e => setSearchTerm(search.current.value) }
                    name="userSearch"
                    placeholder="Search here"
                />
            </div>
            <div className="usersNotFollowingList">
                {
                    filteredUsers.map(user=> {
                        return <Person user={user} constructFollow={constructFollow} />
                    })
                }
            </div>
        </div>
    )
}