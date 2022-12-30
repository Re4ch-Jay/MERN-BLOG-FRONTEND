import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './login.css'
import {Context} from '../../context/Context'
import axios from 'axios'
function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {dispatch, isFetching, error} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
      const res = await axios.post("/auth/login", {
        username, password
      })
      console.log(res)
      if(res){
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        navigate('/')
      }
    } catch (error) {
      dispatch({type: "LOGIN_FAILURE", payload: error.response.data.error})
      console.log(error.response.data.error)
    }
  }
  return (
    <div className='login'>
        <div className="loginTitle">Login</div>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text"
              placeholder='Enter your username'
              onChange={e => setUsername(e.target.value)}
              value={username}
              />
            <label>Password</label>
            <input 
              type="password" 
              placeholder='Enter your password'
              onChange={e => setPassword(e.target.value)}
              value={password}
               />
            {error && <div className='error'>{error}</div>}
            <button type='submit' className='loginButton' disabled={isFetching}>Login</button>
        </form>
        <div className="loginRegisterContainer">
            <p>Don't have account?</p>
            <button className='loginRegister'>
              <Link to='/register'>
                Register
              </Link>
            </button>
        </div>
    </div>
  )
}

export default Login