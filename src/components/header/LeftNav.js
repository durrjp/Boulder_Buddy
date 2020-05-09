import React, { useState } from 'react'
import "./Navigation.css"
import line from "./Line.PNG"
import NavToggleButton from './NavToggleButton'
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

const LeftNav = ({showLeftNav, setActiveList, toggleNav}) => {
    const { open } = useSpring({ open: showLeftNav ? 0 : 1 });

    const CollapseWrapper = styled(animated.div)`
        justify-content:center;
        top: 0rem;
        left: auto;
        right: auto;
        `;

    const [inProp, setInProp] = useState(false);
    
    if (showLeftNav === true) {
        return (
        <CollapseWrapper className="leftNav" style={{
            transform: open.interpolate({
              range: [0, 1],
              output: [0, -200],
            }).interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
          }}
        >
            <div className="menuButtonContainerRight" onClick={toggleNav}>
                <NavToggleButton />
            </div>
            <div className={`leftNavItem`} onClick={() => {
                setActiveList('home')
                toggleNav()
                setInProp(!inProp)
                }
            }>
                Home
            </div>

            <div className="lineDiv">
            <img className="line" src={line} alt=""/>
            </div>

            <div className="leftNavItem" onClick={() => {
                setActiveList('newSession')
                toggleNav()
                }
            }>
                New Session
            </div>
            
            <div className="lineDiv">
            <img className="line" src={line} alt=""/>
            </div>
            <div className="leftNavItem" onClick={() => {
                setActiveList('mySessions')
                toggleNav()
                }
            }>
                My Sessions
            </div>
            <div className="lineDiv">
            <img className="line" src={line} alt=""/>
            </div>
            <div className="leftNavItem" onClick={() => {
                setActiveList('socialize')
                toggleNav()
                }
            }>
                Socialize
            </div>
            <div className="lineDiv">
            <img className="line" src={line} alt=""/>
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
            
        </CollapseWrapper>
        )
    } else {
        return ""
    }
    
}

export default LeftNav

