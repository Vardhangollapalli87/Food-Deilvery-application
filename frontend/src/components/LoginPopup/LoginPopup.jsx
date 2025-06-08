import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext.jsx'
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import {toast} from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

  const [currState,setCurrState] = useState("Login");

  const {url,setToken} = useContext(StoreContext);

  const [showPassword,setShowPassword] = useState(false);

  const [data,setData] = useState({
    name:'',
    email:'',
    password:'',
  })

  const onChangeHandler =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setData({...data,[name]:value});
  }

  const onLogin = async (event)=>{
    event.preventDefault();

    let newUrl = url;

    if(currState === 'Login'){
      newUrl+= '/user/login'
    }
    else{
      newUrl+= '/user/register'
    }

    const response = await axios.post(newUrl,data);

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem('token',response.data.token);
      setShowLogin(false);

      const helper = (currState==='Login'? 'Logged in':'signed up');
      toast.success(helper);
    }
    else{
      toast.error(response.data.message);
    }

  }

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img src={assets.cross_icon} alt="" onClick={()=>setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Login'? <></> : <input type="text" placeholder='Your name' required name='name' onChange={onChangeHandler} value={data.name}/>}
          <input type="email" placeholder='Your email' required name='email' onChange={onChangeHandler} value={data.email}/>
          <div className="login-popup-password">
            <input type={showPassword ? 'text': 'password'} placeholder='Password' required name='password' onChange={onChangeHandler} value={data.password} />
            <span
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

        </div>
        <button type='submit'>{currState === 'Sign Up'?'Create account':"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing , I agree to the terms of use & privacy policy .</p>
        </div>

        {currState === 'Login'? 
          <p className='last-line'>Create a new account? <span onClick={()=> setCurrState("Sign Up")}>Click here</span></p> :
          <p className='last-line'>Already have an account? <span onClick={()=> setCurrState('Login')}>Login here</span></p>
        } 
      </form>
    </div>
  )
}

export default LoginPopup
