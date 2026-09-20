import React,{ useState, useContext } from "react"
import UserContext from '../context/userContext.jsx'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const UserProtectWrapper = ({children}) => {

    const { user, setUser} = React.useContext(UserContext);

    const [loading, setLoading] = useState('true')

    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token){
            navigate('/login')
        }

        axios.get('http://localhost:3000/user/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data.user)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('token')
            navigate('/login')
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

export default UserProtectWrapper