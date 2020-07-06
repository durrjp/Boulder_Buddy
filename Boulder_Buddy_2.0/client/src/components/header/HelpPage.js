import React from "react"
import climberGuy from "./climberGuy.png"
import "./Header.css"


export default ({toggleHelp}) => {
    return (
        <>
        <div className="helpModal">

            <div className="helpModalTop">
                <img className="climberGuy" src={climberGuy} alt="" />
                <div className="helpHeader">Help Page</div>
                <button className="helpModalCloseBtn" onClick={() => toggleHelp()}>X</button>
            </div>
            <section>
                
                <div className="helpSubHeader">Boulder Buddy Lingo:</div>
                    <ul>
                        <li>"Sent/Completed": a completed boulder where two hands touch the final hold</li>
                        <li>"Flashed": a boulder that is completed on the first attempt</li>
                    </ul>
                <div className="helpSubHeader">Starting a Session:</div>
                    <ol>
                        <li>Start a new session by choosing "New Session" in the hamburger menu or on the Home Page</li>
                        <li>Enter Date of the climbing session and Location, then choose "Start Session"</li>
                        <li>Log each boulder climbed during that session:</li>
                        <ul>
                            <li>Select how many attempts on the boulder</li>
                            <li>Select if you "sent" (completed) the boulder</li>
                            <li>Select the grade of the boulder to submit to your Log below</li>
                        </ul>
                        <li>Boulders can be edited and deleted in the Session Log</li>
                    </ol>

            </section>
        </div>
        </>
    )
}