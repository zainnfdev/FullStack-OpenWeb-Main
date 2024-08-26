const LoginForm = ({ handelLogin,username,password,handleUsernameChange,handlePasswordChange }) => {
  return (
    <div>
      <form onSubmit={handelLogin}>
        <div>
                    username :
          <input id='username' type='text' value={username} name='Username' onChange={handleUsernameChange}/>
        </div>
        <div>
                    password :
          <input id='password' type='password' value={password} name='Password' onChange={handlePasswordChange}/>
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm