import React, { useState, useContext } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import CaptainContext from '../context/captainContext.jsx';
import { toast } from 'react-toastify'
import axios from 'axios';

const CaptainRegister = () => {

    const navigate = useNavigate();

    const {captain, setCaptain} = React.useContext(CaptainContext);

    const [formData, setFormData] = useState({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: '',
        status: 'active',
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            vehicleType: 'car'
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignup = async(e) => {
        e.preventDefault();

        const captainData = {
            ...formData,
            vehicle: {
                ...formData.vehicle,
                capacity: Number(formData.vehicle.capacity)
            },
        };

        console.log("Captain data:", captainData);
console.log("Capacity:", captainData.vehicle.capacity);
console.log("Capacity type:", typeof captainData.vehicle.capacity);

        axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)
            .then((response) => {
                console.log(response.data);
                setCaptain(response.data.captain);

                setFormData({
        fullname: {
            firstname: '',
            lastname: ''
        },
        email: '',
        password: '',
        status: 'active',
        vehicle: {
            color: '',
            plate: '',
            capacity: '',
            vehicleType: 'car'
        },
    });

                navigate('/captain-login');
            })
            .catch((error) => {
                toast.error(response.data.message)
            });

    };


    return (
        <div>
            <div className="p-4 w-full min-h-screen flex flex-col gap-3 md:items-center">

                <div className="md:flex md:justify-between md:items-center w-full flex-col">

                    <div>
                        <img
                            src="https://tb-static.uber.com/prod/udam-assets/e24f1914-1e23-4896-ad77-22e88c37c2f9.svg"
                            alt="logo"
                        />
                    </div>

                    <h1 className="text-4xl font-bold mt-6">
                        Captain Sign Up
                    </h1>

                    <form
                        className="flex flex-col gap-3 mt-8 md:w-1/3"
                        onSubmit={handleSignup}
                    >

                        {/* Name */}

                        <h1 className="text-2xl font-bold">
                            What's your name
                        </h1>

                        <input
                            type="text"
                            name="firstname"
                            placeholder="First name"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.fullname.firstname}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    fullname: {
                                        ...prev.fullname,
                                        firstname: e.target.value
                                    }
                                }))
                            }
                        />

                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last name"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.fullname.lastname}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    fullname: {
                                        ...prev.fullname,
                                        lastname: e.target.value
                                    }
                                }))
                            }
                        />

                        {/* Email */}

                        <h1 className="text-2xl font-bold">
                            Email
                        </h1>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {/* Password */}

                        <h1 className="text-2xl font-bold">
                            Enter password
                        </h1>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        {/* Vehicle */}

                        <h1 className="text-2xl font-bold mt-4">
                            Vehicle Details
                        </h1>

                        <input
                            type="text"
                            placeholder="Vehicle color"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.vehicle.color}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    vehicle: {
                                        ...prev.vehicle,
                                        color: e.target.value
                                    }
                                }))
                            }
                        />

                        <input
                            type="text"
                            placeholder="Vehicle plate"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.vehicle.plate}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    vehicle: {
                                        ...prev.vehicle,
                                        plate: e.target.value
                                    }
                                }))
                            }
                        />

                        <input
                            type="number"
                            placeholder="Vehicle capacity"
                            min="1"
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.vehicle.capacity}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    vehicle: {
                                        ...prev.vehicle,
                                        capacity: e.target.value
                                    }
                                }))
                            }
                        />

                        <select
                            className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 focus:outline-none"
                            value={formData.vehicle.vehicleType}
                            onChange={(e) =>
                                setFormData(prev => ({
                                    ...prev,
                                    vehicle: {
                                        ...prev.vehicle,
                                        vehicleType: e.target.value
                                    }
                                }))
                            }
                        >
                            <option value="car">Car</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="auto">Auto</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full p-2 bg-black text-white font-semibold rounded-md mt-8 hover:bg-gray-800 cursor-pointer active:scale-99 transition-all duration-300"
                        >
                            Sign Up
                        </button>

                        <p className="text-gray-600 font-semibold">
                            Already have an account?{" "}
                            <Link
                                to="/captain-login"
                                className="text-blue-700 font-semibold hover:text-blue-500"
                            >
                                Login
                            </Link>
                        </p>

                    </form>
                </div>

                <div className="md:w-1/3 flex">
                    <Link to='/login' className='flex justify-center bg- w-full p-2 bg-gray-800 text-white font-semibold rounded-md mt-4'> Login as User</Link>
                </div>

            </div>
        </div>
    );
};

export default CaptainRegister;