import { Link, useNavigate } from "react-router-dom"
import React,{ useState, useContext } from "react"
import UserContext from '../context/userContext.jsx'
import axios from "axios";
import { toast } from 'react-toastify'

const UserLogin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { user, setUser} = React.useContext(UserContext);

    const handleLogin = async(e) => {
        e.preventDefault();

        const newUser = {
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, newUser)

        if (response.status === 201) {
            toast.success('Login successful')
            setUser(response.data.user)
            localStorage.setItem('token', response.data.token);
            navigate('/home')

        } else {
            toast.error(response.data.message)
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <div className="w-full h-screen flex gap-4 md:items-center w-full flex-col p-8" >

                <div >
                    <img src="https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg" alt="" />
                </div>

                <div className="p-4 md:w-1/3  py-14 flex flex-col gap-3  md:items-center ">

                    <div className='md:flex md:justify-between md:items-center w-full flex-col'>

                        <h1 className='text-4xl font-bold w-full '>User Login</h1>

                        <form className='flex flex-col gap-3 mt-8 w-full' onSubmit={handleLogin}>
                            <h1 className='text-2xl font-bold'>What's your email</h1>
                            <input type='email' placeholder='enter your email' className='w-full p-2 border border-gray-400 rounded-md
                        bg-gray-100 focus:outline-none' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                            <h1 className='text-2xl font-bold'>Enter password</h1>
                            <input type='password' placeholder='enter your password' className='w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                            <button type='submit' className='w-full p-2 bg-black text-white font-semibold rounded-md mt-8 hover:bg-gray-800 cursor-pointer active:scale-99 transition-all duration-300'>Login</button>

                            <p className='text-gray-600 font-semibold'>Don't have an account? <Link to='/signup' className='text-blue-700 font-semibold hover:text-blue-500 cursor-pointer'>Sign Up</Link></p>
                        </form>

                    </div>

                    <div className=" w-full">
                        <Link to='/captain-login' className='flex justify-center w-full p-2 bg-gray-800 text-white font-semibold rounded-md mt-4'>Login as Captain </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default UserLogin