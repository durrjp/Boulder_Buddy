import React from 'react'
import "./Navigation.css"
import "./LeftNav.css"


const LeftNav = ({showLeftNav, setActiveList, toggleNav}) => {
    if (showLeftNav === true) {
        return (
        <aside className="leftNav">
            <div className="" onClick={() => {
                setActiveList('home')
                toggleNav()
                }
            }>
                Home
            </div>
            <div className="" onClick={() => {
                setActiveList('newSession')
                toggleNav()
                }
            }>
                New Session
            </div>
            <div className="" onClick={() => {
                setActiveList('mySessions')
                toggleNav()
                }
            }>
                My Sessions
            </div>
            <div className="" onClick={() => {
                setActiveList('socialize')
                toggleNav()
                }
            }>
                Socialize
            </div>
            <div className="" onClick={() => {
                setActiveList('stats')
                toggleNav()
                }
            }>
                Stats
            </div>
        </aside>
        )
    } else {
        return ""
    }
}

export default LeftNav