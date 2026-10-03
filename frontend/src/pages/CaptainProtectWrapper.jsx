import React, { useState, useEffect } from "react";
import CaptainContext from "../context/captainContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
    const { setCaptain } = React.useContext(CaptainContext);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {

        // No token
        if (!token) {
            navigate("/captain-login");
            return;
        }

        // Logged-in user trying to access captain route
        if (role !== "captain") {
            navigate("/home");
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {

                setCaptain(response.data.captain);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);

                localStorage.removeItem("token");
                localStorage.removeItem("role");

                navigate("/captain-login");
            });

    }, [token, role, navigate, setCaptain]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return children;
};

export default CaptainProtectWrapper;