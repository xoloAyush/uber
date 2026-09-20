import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import UserContext from '../context/userContext.jsx'

const UserRegister = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const { user, setUser} = React.useContext(UserContext);

    const handleSignup = async (e) => {
        e.preventDefault();

        const newUser = {
            fullname: { firstname, lastname },
            email: email,
            password: password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)

        if (response.status === 201) {
            toast.success('Account created successfully')
            setUser(response.data.user)

            console.log(response.data.user)

            navigate('/login')
        } else {
            toast.error(response.data.message)
        }

        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
    }


    return (
        <div>
            <div className="p-4  w-full h-screen flex flex-col gap-3  md:items-center" >
                <div className='md:flex md:justify-between md:items-center w-full flex-col'>
                    <div >
                        <img src="https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg" alt="" />
                    </div>

                    <h1 className='text-4xl font-bold mt-6'>User Sign Up</h1>

                    <form className='flex flex-col gap-3 mt-8 md:w-1/3' onSubmit={handleSignup}>

                        <h1 className='text-2xl font-bold'>What's your name</h1>
                        <input type='text' placeholder='first name' className='w-full p-2 border border-gray-400 rounded-md
                        bg-gray-100 focus:outline-none' value={firstname} onChange={(e) => setFirstname(e.target.value)}></input>

                        <input type='text' placeholder='last name' className='w-full p-2 border border-gray-400 rounded-md
                        bg-gray-100 focus:outline-none' value={lastname} onChange={(e) => setLastname(e.target.value)}></input>

                        <h1 className='text-2xl font-bold'>Email</h1>
                        <input type='email' placeholder='enter your email' className='w-full p-2 border border-gray-400 rounded-md
                        bg-gray-100 focus:outline-none' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                        <h1 className='text-2xl font-bold'>Enter password</h1>
                        <input type='password' placeholder='enter your password' className='w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                        <button type='submit' className='w-full p-2 bg-black text-white font-semibold rounded-md mt-8 hover:bg-gray-800 cursor-pointer active:scale-99 transition-all duration-300'>Sign Up</button>

                        <p className='text-gray-600 font-semibold'>Already have an account? <Link to='/login' className='text-blue-700 font-semibold hover:text-blue-500 cursor-pointer'>Login</Link></p>
                    </form>

                </div>

                <div className="md:w-1/3 flex">
                    <Link to='/captain-signup' className='flex justify-center bg- w-full p-2 bg-gray-800 text-white font-semibold rounded-md mt-4 mb-4'>Captain Sign Up</Link>
                </div>

            </div>
        </div>
    )
}

export default UserRegister