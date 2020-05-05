import React, { useEffect, useState, useRef } from "react"
import {Link} from "react-router-dom"
import HomeRender from "./home/HomeRender"
import NewSessionRender from "./newSessions/NewSessionRender"
import { UserProvider } from "./users/UserProvider"
import { DataStore } from "./DataStore"
import { SessionsProvider } from "./mySessions/SessionProvider"
import { BouldersProvider } from "./boulders/BoulderProvider"
import MySessionsRender from "./mySessions/MySessionsRender"
import TopNav from "./header/TopNav"
import LeftNav from "./header/LeftNav"
import "./BoulderBuddy.css"
import "./header/Header.css"
import StatsRender from "./stats/StatsRender"
import { FollowsProvider } from "./socialize/FollowProvider"
import SocializeRender from "./socialize/SocializeRender"

const Dashboard = (props) => {
    const [activeList, setActiveList] = useState("home")
    const [components, setComponents] = useState()
    
    const [showLeftNav, setShowLeftNav] = useState(false)
    const toggleNav = () => {
        setShowLeftNav(!showLeftNav)
    }

    const showHome = () => (
        <UserProvider>
            <HomeRender setActiveList={setActiveList}/>
        </UserProvider>
    )

    const showNewSession = () => (
        <SessionsProvider>
            <NewSessionRender setActiveList={setActiveList}/>
        </SessionsProvider>
    )

    const showMySessions = () => (
        <SessionsProvider>
            <BouldersProvider>
                <MySessionsRender/>
            </BouldersProvider>
        </SessionsProvider>
    )

    const showSocialize = () => (
        <UserProvider>
            <FollowsProvider>
                <SessionsProvider>
                    <BouldersProvider>
                        <SocializeRender />
                    </BouldersProvider>
                </SessionsProvider>
            </FollowsProvider>
        </UserProvider>
    )

    const showStats = () => (
        <UserProvider>
            <SessionsProvider>
                <BouldersProvider>
                    <StatsRender/>
                </BouldersProvider>
            </SessionsProvider>
        </UserProvider>

    )

    useEffect(() => {
        if (activeList === "home") {
            setComponents(showHome)
        }
        if (activeList === "newSession") {
            setComponents(showNewSession)
        }
        if (activeList === "mySessions") {
            setComponents(showMySessions)
        }
        if (activeList === "socialize") {
            setComponents(showSocialize)
        }
        if (activeList === "stats") {
            setComponents(showStats)
        }
    }, [activeList])

    return (
        <>
            <div className="mainContainer">
            <DataStore>
                <div className="headerContainer">
                    <TopNav toggleNav={toggleNav} />
                    <Link className="logoutLink"
                        onClick={e => {
                            e.preventDefault()
                            localStorage.removeItem("boulderbuddy_user")
                            props.history.push("/")
                        }}
                    >Logout</Link>
                </div>
                <div className="renderComponents">
                    <LeftNav className="expandable" toggleNav={toggleNav} showLeftNav={showLeftNav} setActiveList={setActiveList} />
                    {components}
                </div>
            </DataStore>
            </div>
        </>
    )
}

export default Dashboard