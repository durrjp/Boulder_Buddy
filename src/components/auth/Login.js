import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import loginLogo from "./images/BoulderBuddyLogo.png"



const Login = props => {
    const email = useRef()
    const password = useRef()
    const userName = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8080/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("boulderbuddy_user", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                } else if (!exists) {
                    fetch("http://localhost:8080/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            name: userName.current.value,
                        })
                    })
                        .then(_ => _.json())
                        .then(response => {
                            localStorage.setItem("boulderbuddy_user", response.id)
                            props.history.push("/")
                        })
                }
            })
    }

    return (
        
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="loginLogoContainer">
                        <img className="loginLogo" src={loginLogo} alt="Logo"/>
                    </div>
                    <div className="loginInfoContainer">
                        <fieldset>
                            <input ref={email} type="email"
                                id="email"
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <input ref={password} type="password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required />
                        </fieldset>
                        <br></br>
                        <fieldset>
                            <button className="signInButton"type="submit">
                                Sign in
                            </button>
                        </fieldset>
                    </div>
                </form>
            </section>
            <section className="link--register">
                Not a member? <Link to="/register">Register Here</Link>
            </section>
        </main>
    )
}
export default Login