import React, { useRef } from 'react'
import NavToggleButton from './NavToggleButton'
import "./Navigation.css"

const TopNav =  ({handleClick, toggleNav}) => {
    const wrapperRef = useRef("")

    return (
    <header className="topNav">
        
        <div ref={wrapperRef} className="menuButtonContainer" onClick={()=> {
            toggleNav()
            handleClick()
        }}>
            <NavToggleButton />
        </div>
    </header>
    )
}

export default TopNav

