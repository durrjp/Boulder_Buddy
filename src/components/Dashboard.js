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
import {ReactComponent as HelpIcon} from "./header/helpSection2.svg"
import { Modal } from "reactstrap"
import HelpPage from "./header/HelpPage"
import "./header/Navigation.css"



const Dashboard = (props) => {
    const [activeList, setActiveList] = useState("home")
    const [components, setComponents] = useState()
    
    const [showLeftNav, setShowLeftNav] = useState(false)
    const toggleNav = () => {
        setShowLeftNav(!showLeftNav)
    }

    const [showHelp, setShowHelp] = useState(false)
    const toggleHelp = () => {
        setShowHelp(!showHelp)
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
                    <StatsRender />
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
                <svg width="150" height="150" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="-11" cy="-11" r="125" fill="url(#paint0_linear)" fillOpacity="0.3"/>
                    <circle cx="5" cy="4" r="70" fill="#EADA8A" fillOpacity="0.5"/>
                    <circle cx="-3" r="50" fill="#FD8D6E" fillOpacity="0.5"/>
                    <defs>
                    <linearGradient id="paint0_linear" x1="-51.493" y1="-58.5352" x2="66.4648" y2="72.9202" gradientUnits="userSpaceOnUse">
                    <stop offset="0.177083" stopColor="#DE7338" stopOpacity="0.61"/>
                    <stop offset="0.5625" stopColor="#E4E82E" stopOpacity="0.54"/>
                    </linearGradient>
                    </defs>
                </svg>
                <div className="contentContainer">
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
                            <HelpIcon className="helpIcon" onClick={toggleHelp}/>
                        </div>
                        <div className="renderComponents">
                            <LeftNav className="expandable" toggleNav={toggleNav} showLeftNav={showLeftNav} setActiveList={setActiveList} />
                            {components}
                        </div>
                        <Modal isOpen={showHelp}>
                            <HelpPage toggleHelp={toggleHelp}/>
                        </Modal>
                    </DataStore>
                </div>
            </div>
        </>
    )
}

export default Dashboard