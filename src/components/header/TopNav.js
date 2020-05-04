import React, { useRef } from 'react'
import NavToggleButton from './NavToggleButton'
import "./Navigation.css"

const TopNav =  ({toggleNav}) => {
    const wrapperRef = useRef("")
    const handleClick =()=> {
        const wrapper = wrapperRef.current
        wrapper.classList.toggle('is-nav-open')
    }


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