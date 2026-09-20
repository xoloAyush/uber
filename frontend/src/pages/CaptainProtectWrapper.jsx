import React,{ useState, useContext } from "react"
import CaptainContext from '../context/captainContext.jsx'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CaptainProtectWrapper = ({children}) => {

    const { captain, setCaptain } = React.useContext(CaptainContext);

    const [loading, setLoading] = useState('true')

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
            navigate('/captain-login')
        }

         axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setCaptain(response.data.captain)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('token')
            navigate('/captain-login')
        })

    }, [token])

    if(loading){
        return(
            <div> Loading... </div>
        )
    }

    return(
        <div>
            {children}  
        </div>
    )
}

export default CaptainProtectWrapper