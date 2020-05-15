import React from "react"
import { Route, Redirect } from "react-router-dom"
import Dashboard from "./Dashboard"
import Register from "./auth/Register"
import Login from "./auth/Login"
import "./BoulderBuddy.css"
import "./header/Navigation.css"


export default () => (
    <>
    <div className="App">
    
    <Route render={() =>{
        if (localStorage.getItem("boulderbuddy_user")) {
            return (
                <>
                    <Route render={props => <Dashboard {...props} />} />
                </>
            )
        } else {
            return <Redirect to="/login" />
        }
    }}
    />
    <Route path="/login" render={props => <Login {...props} />} />
    <Route path="/register" render={props => <Register {...props} />} />
    </div>
    </>
)