import React from 'react'
import NavToggleButton from './NavToggleButton'
import "./Navigation.css"

const TopNav =  ({toggleNav}) => (
    <header className="topNav">
        <div className="menuButtonContainer" onClick={toggleNav}>
            <NavToggleButton />
        </div>
    </header>
)

export default TopNav