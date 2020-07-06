import React, { useState } from 'react'
import "./Navigation.css"
import NavToggleButton from './NavToggleButton'
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

const LeftNav = ({showLeftNav, setActiveList, toggleNav, handleClick}) => {
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
            <div className="leftNavItem Home" onClick={() => {
                setActiveList('home')
                toggleNav()
                handleClick()
                setInProp(!inProp)
                }
            }>
                Home
            </div>

            <div className="leftNavItem" onClick={() => {
                setActiveList('newSession')
                toggleNav()
                handleClick()
                }
            }>
                New Session
            </div>
            
            <div className="leftNavItem" onClick={() => {
                setActiveList('mySessions')
                toggleNav()
                handleClick()
                }
            }>
                My Sessions
            </div>
            
            <div className="leftNavItem" onClick={() => {
                setActiveList('socialize')
                toggleNav()
                handleClick()
                }
            }>
                Socialize
            </div>
            
            <div className="leftNavItem" onClick={() => {
                setActiveList('stats')
                toggleNav()
                handleClick()
                }
            }>
                Stats
            </div>
            <div className="menuButtonContainerRight shaded" onClick={(e) => {
                toggleNav()
                handleClick()
            }}>
                <NavToggleButton />
            </div>
            
        </CollapseWrapper>
        )
    } else {
        return ""
    }
    
}

export default LeftNav

