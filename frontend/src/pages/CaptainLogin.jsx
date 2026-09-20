import React, { useState, useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import CaptainContext from '../context/captainContext.jsx';
import { toast } from 'react-toastify'
import axios from 'axios';

const CaptainLogin = () => {

    const navigate = useNavigate();

    const {captain, setCaptain} = React.useContext(CaptainContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const captainData = {
            email: email,
            password: password
        }
        axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData)
                    .then((response) => {
                        setCaptain(response.data.captain);
                        localStorage.setItem('token', response.data.token);
                        toast.success('Login successful');
        
                        navigate('/captain-home');

                        setEmail('');
                        setPassword('');
                    })
                    .catch((error) => {
                        toast.error(response.data.message)
                    });
    }

    return (
        <div>
            <div className="p-4  w-full h-screen flex flex-col gap-3  md:items-center" >
                <div className='md:flex md:justify-between md:items-center w-full flex-col'>
                    <div >
                        <img src="https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg" alt="" />
                    </div>

                    <h1 className='text-4xl font-bold mt-8'>Captain Login</h1>

                    <form className='flex flex-col gap-3 mt-8 md:w-1/3' onSubmit={handleLogin}>
                        <h1 className='text-2xl font-bold'>What's your email</h1>
                        <input type='email' placeholder='enter your email' className='w-full p-2 border border-gray-400 rounded-md
                        bg-gray-100 focus:outline-none' value={email} onChange={(e) => setEmail(e.target.value)}></input>

                        <h1 className='text-2xl font-bold'>Enter password</h1>
                        <input type='password' placeholder='enter your password' className='w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                        <button type='submit' className='w-full p-2 bg-black text-white font-semibold rounded-md mt-8 hover:bg-gray-800 cursor-pointer active:scale-99 transition-all duration-300'>Login</button>

                        <p className='text-gray-600 font-semibold'>Don't have an account? <Link to='/captain-signup' className='text-blue-700 font-semibold hover:text-blue-500 cursor-pointer'>Captain Sign Up</Link></p>
                    </form>

                </div>

                <div className="md:w-1/3 flex">
                    <Link to='/login' className='flex justify-center bg- w-full p-2 bg-gray-800 text-white font-semibold rounded-md mt-4'>User Login</Link>
                </div>

            </div>
        </div>
    )
}

export default CaptainLogin