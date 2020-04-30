import React, { useEffect, useState } from "react"
import HomeRender from "./home/HomeRender"
import NewSessionRender from "./newSessions/NewSessionRender"
import { UserProvider } from "./users/UserProvider"
import { DataStore } from "./DataStore"
import { SessionsProvider } from "./mySessions/SessionProvider"
import { BouldersProvider } from "./boulders/BoulderProvider"
import MySessionsRender from "./mySessions/MySessionsRender"


export default (props) => {
    const [activeList, setActiveList] = useState("home")
    const [components, setComponents] = useState()


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
        <>
        </>
    )

    const showStats = () => (
        <>
        </>
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
                <div className="headerContainer"></div>
                <div className="renderComponents">
                    {components}
                </div>
            </DataStore>
            </div>
        </>
    )
}



