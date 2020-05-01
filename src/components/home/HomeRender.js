import React, { useContext } from "react"
import { UserContext } from "../users/UserProvider"
import "./HomeRender.css"
import "../BoulderBuddy.css"
import {ReactComponent as NewSession} from "./homeImages/sessionIcon.svg"
import {ReactComponent as Socialize} from "./homeImages/friends.svg"
import {ReactComponent as MySessions} from "./homeImages/mySessions.svg"
import {ReactComponent as Stats} from "./homeImages/stats2.svg"
import logo from "./homeImages/BoulderBuddyLogoNoText.png"



export default (props) => {
    const { users } = useContext(UserContext)
    const currentUserId = parseInt(localStorage.getItem("boulderbuddy_user"))
    const currentUser = users.find(user => user.id === currentUserId) || {}

    return (
    <>
        <div className="homeHeader headerFont">Welcome {currentUser.name}</div>
        <div className="homeDivsContainer">
            <div className="homeRow1">
                <div className="homeItem" onClick={() => props.setActiveList("newSession")}>
                    <div className="homeItem_header">New Session</div>
                    <NewSession className="home_icon"/>
                </div>
                <div className="homeItem" onClick={() => props.setActiveList("socialize")}>
                    <div className="homeItem_header">Socialize</div>
                    <Socialize className="home_icon"/>
                </div>
            </div>
            <div className="homeRow2">
                <div className="homeItem" onClick={() => props.setActiveList("mySessions")}>
                    <div className="homeItem_header">My Sessions</div>
                    <MySessions className="home_icon"/>
                </div>
                <div className="homeItem" onClick={() => props.setActiveList("stats")}>
                    <div className="homeItem_header">Stats</div>
                    <Stats className="home_icon"/>
                </div>
            </div>
        </div>
        <div className="logoContainer">
            <img className="imageLogo" src={logo}/>
        </div>
    </>
    )
}