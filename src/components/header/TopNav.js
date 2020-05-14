import React, { useRef } from 'react'
import NavToggleButton from './NavToggleButton'
import "./Navigation.css"

const TopNav =  ({toggleNav}) => {
    const wrapperRef = useRef("")

    return (
    <header className="topNav">
        <svg width="114" height="114" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div ref={wrapperRef} className="menuButtonContainer" onClick={()=> {
            toggleNav()
        }}>
            <NavToggleButton />
        </div>
    </header>
    )
}

export default TopNav

