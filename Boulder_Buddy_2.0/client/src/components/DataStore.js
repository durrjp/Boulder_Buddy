import React from "react"
import { SessionsProvider } from "./mySessions/SessionProvider"
import { BouldersProvider } from "./boulders/BoulderProvider"
import { FollowsProvider } from "./socialize/FollowProvider"
import { UserProvider } from "./users/UserProvider"

export const DataStore = props => (
    <SessionsProvider>
        <BouldersProvider>
            <FollowsProvider>
                <UserProvider>
                    {props.children}
                </UserProvider>
            </FollowsProvider>
        </BouldersProvider>
    </SessionsProvider>
)