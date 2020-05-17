import React, { useRef } from "react"
import "./Login.css"
import { Link } from "react-router-dom";


const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()

    const existingUserCheck = () => {
        return fetch(`https://boulder-buddy-api.herokuapp.com/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return false
                } else {
                    return true
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
                existingUserCheck()
                .then((result) => {
                    if (result) {
                    fetch("https://boulder-buddy-api.herokuapp.com/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("boulderbuddy_user", createdUser.id)
                                props.history.push("/")
                            }
                        })
                    } else {
                        window.alert("This email is already in use")
                    }
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <main className="registerContainer" style={{ textAlign: "center" }}>
            <div className="closeRegBtnContainer">
                <button className="closeRegisterBtn">
                    <Link style={{color: "#6B3411"}} to="/login">Close</Link>
                </button>
            </div>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="registerHeader">Registration Page</h1>
                <div className="registerInputContainer">
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </div>
                <div className="registerInputContainer">
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </div>
                <div className="registerInputContainer">
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </div>
                <div className="registerInputContainer">
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </div>
                <div className="registerInputContainer">
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </div>
                <div className="registerLoginButton">
                    <button className="registerBtn" type="submit">
                        Register and Login
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Register