import {useState, useRef, useEffect, useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserDataContext } from '../../context/UserContext';
import axios from 'axios';
import { conf } from '../../config/conf';

const UserSignup = () => {
    const {user,setuser}=useContext(UserDataContext);
    const navigate = useNavigate()
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')
    const token = localStorage.getItem('access-token')

  useEffect(() => {
    if(token){
        navigate('/')
    }
      
  }, [])
    const loginSubmit= async(e)=>{
        e.preventDefault()
        
        console.log({email,password});
        const response = await axios.post(`${conf.port}/api/users/login`,{  email, password })
        if(response.status === 201){
          const data = response.data
          setuser(data.user)
          localStorage.setItem('user',data.user)
          localStorage.setItem('access-token',data.token)
          localStorage.setItem('user-type','user')
          // console.log(user);
          navigate('/user')
          
        }
        setemail('')
        setpassword('')
        
    }

  return (
    <div className='p-7 flex flex-col justify-between h-screen min-h-screen w-full'>
        <div>
        <img className='w-20 ' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
       
        

       
            <form action="">
                <h3 className='text-xl mt-16 font-medium mb-2'> What's your email</h3>
                <input value={email} onChange={(e)=>setemail(e.target.value)} className='border bg-white px-4 py-2 w-full text-lg placeholder:text-base border-black rounded-lg' placeholder='email@ex.com' required  type="email" />
            
                <h3 className='text-xl mt-4 font-medium mb-2'> Password</h3>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} className='border bg-white px-4 py-2 w-full text-lg placeholder:text-base border-black rounded-lg' placeholder='*******' required  type="password" />
            
                <button onClick={(e)=>loginSubmit(e)} className='bg-[#111] text-white font-semibold mb-4 rounded-lg w-full text-lg  px-5 py-3 mt-6'>Login</button>
                <p> <Link className=' text-blue-600'>Forget Password ?</Link></p>
                <p>New here? <Link to='/signup' className=' text-blue-600'>Create New Account</Link></p>
            </form>
        </div>
        <div className='w-full'>
            <Link to='/captain-login' className='bg-[#10b461] flex justify-center text-white font-semibold  rounded-lg w-full text-lg  px-5 py-3 mt-6'>Login as an Captain</Link>
        </div>
    </div>
  )
}

export default UserSignup