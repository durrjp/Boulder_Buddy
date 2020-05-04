import React, { useState } from 'react'
import "./Navigation.css"
import line from "./Line.PNG"
import NavToggleButton from './NavToggleButton'
import 'react-animation/dist/keyframes.css'
import { animations } from 'react-animation'
import fadeInDown from "react-animations/lib/fade-in-down"






const LeftNav = ({showLeftNav, setActiveList, toggleNav}) => {
    const [inProp, setInProp] = useState(false);
    const style = {
        fadeInDown: {
            animation: 'x 1s',
            animationName: fadeInDown
        }
    } 

    
    
    if (showLeftNav === true) {
        return (
        <div className="leftNav" style={style.fadeInDown}>
            <div className={`leftNavItem`} onClick={() => {
                setActiveList('home')
                toggleNav()
                setInProp(!inProp)
                }
            }>
                Home
            </div>

            <div className="lineDiv">
            <img className="line" src={line}/>
            </div>

            <div className="leftNavItem" onClick={() => {
                setActiveList('newSession')
                toggleNav()
                }
            }>
                New Session
            </div>
            
            <div className="lineDiv">
            <img className="line" src={line}/>
            </div>
            <div className="leftNavItem" onClick={() => {
                setActiveList('mySessions')
                toggleNav()
                }
            }>
                My Sessions
            </div>
            <div className="lineDiv">
            <img className="line" src={line}/>
            </div>
            <div className="leftNavItem" onClick={() => {
                setActiveList('socialize')
                toggleNav()
                }
            }>
                Socialize
            </div>
            <div className="lineDiv">
            <img className="line" src={line}/>
            </div>
            <div className="leftNavItem" onClick={() => {
                setActiveList('stats')
                toggleNav()
                }
            }>
                Stats
            </div>
            <div className="menuButtonContainerRight" onClick={toggleNav}>
            <NavToggleButton />
            </div>
            
        </div>
        )
    } else {
        return ""
    }
    
}

export default LeftNav