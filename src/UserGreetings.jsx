function UserGreetings({ username = "Guest", isLoggedIn = false }) {

  const loggedInMsg = <h2 className="welcome-msg">Welcome {username}!</h2>
  const loginPrompt = <h2 className="login-prompt">Please Login dear {username}</h2>
  
  return isLoggedIn ? loggedInMsg : loginPrompt
}

export default UserGreetings;