import React, { useState, useEffect } from "react";
import UserContext from "../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
    const { setUser } = React.useContext(UserContext);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    useEffect(() => {

        // No token
        if (!token) {
            navigate("/login");
            return;
        }

        // Logged-in captain trying to access user route
        if (role !== "user") {
            navigate("/captain-home");
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);

                localStorage.removeItem("token");
                localStorage.removeItem("role");

                navigate("/login");
            });

    }, [token, role, navigate, setUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return children;
};

export default UserProtectWrapper;