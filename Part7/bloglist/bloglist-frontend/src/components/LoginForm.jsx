import useValue from '../hooks/customeHooks'
import { useDispatch } from 'react-redux'
import { setLoginUser } from '../reducers/userReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const { reset : usernameReset,...username } = useValue('text')
  const { reset : passwordRest,...password } = useValue('password')

  const handelLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username : username.value,
      password : password.value
    }
    dispatch(setLoginUser(credentials))
    usernameReset()
    passwordRest()
  }

  return (
    <div>
      <form onSubmit={handelLogin}>
        <div>
          username :
          <input id='username' {...username}/>
        </div>
        <div>
          password :
          <input id='password' {...password}/>
        </div>
        <button id='login-button' type='submit'>Login</button>
      </form>
    </div>
  )
}
export default LoginForm