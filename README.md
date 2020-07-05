# Boulder Buddy

Boulder Buddy is a mobile-in-mind, web application designed completely in Figma for rock climbers to track their sessions in the gym. Start a new session and track the boulders you climb to eventually view meaningful statistics of you and other climbers you follow. The app was built in React utilizing HTML, CSS, and Javascript and deployed via Heroku. Open up Device Mode (optimized for Iphone 6/7/8 Plus) in your browser's dev tools to view the app in its intended form! Or check out the app on your smart phone or other device. Visit the attached link to register and try it out!!

https://boulder-buddy.herokuapp.com/

**Note - database is reset each day. Feel free to re-register if your account login no longer works, or use these test credentials: Email: test@test.com, Password: test

## Technologies 
* HTML, CSS, Javascript
* React:                  Version 16.13.1
* ReactDOM:               Version 16.13.1
* React-Router-DOM:       Version 5.1.2
* Reactstrap:             Version 8.4.1
* React-ChartJS-2:        Version 2.9.0
* React-Spring            Version 8.0.27
* Styled Components       Version 5.1.0
* Moment                  Version 2.25.3
* JSON Server
* Heroku
* Figma

## Features
List of features currently deployed:
* New Session - create a new bouldering session and log each boulder to the current session
* My Sessions - view all bouldering sessions logged for your account. CRUD functionality available to:
  * Delete entire sessions and associated boulders
  * Add boulders to a session
  * Edit boulders associated with a session
  * Delete boulders associated with a session
* Stats - view statistics associated with the current user's bouldering sessions
  * Bar Graph - displays all boulders attempted vs. all boulders successfully "sent" for each boulder grade
  * Pie Chart - displays flash percentage ("sending" a boulder the first attempt") vs. completed vs. incompleted for each boulder grade
* Socialize - interact with and follow other climbers on the app!
  * Leaderboard - displays top climbers currently on the app based on highest difficulty of boulder "sent" and number of "sends"
  * Find Climbers - search all climbers currently on the app by name and follow them
  * Following - displays all climbers you follow. View that climbers' stats or unfollow the climber
  * Followers - displays all climbers that are following you. You can also block climbers from following you
* Help Page - short information page giving some helpful climbing lingo and instruction on how to start your first session

## To-do list:
* Build out a true back-end using ASP.NET and SQL Server database
* Build true authentication using (potentially) Firebase
