/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import axios from "axios";

const userAuthProfileUrl = import.meta.env.VITE_AUTH_USER_PROFILE_URL;
const updateClientProfileUrl = import.meta.env.VITE_UPDATE_CLIENT_PROFILE_URL;
const updateAdminPasswordUrl = import.meta.env.VITE_UPDATE_ADMIN_PASSWORD_URL;  

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const userAuthenticate = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setLoading(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axios(userAuthProfileUrl, config);
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setLoading(false);
        }
        userAuthenticate();
    }, [])

    const singOff = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const profileUpdate = async (datos) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = updateClientProfileUrl + `/${datos._id}`;
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios.put(url, datos, config);
            return {
                msg: 'Perfil actualizado correctamente',
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            } 
        }
    }

    const passwordSave = async (datos) => {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const url = updateAdminPasswordUrl;
            // eslint-disable-next-line no-unused-vars
            const { data } = await axios.put(url, datos, config); 
            return {
                msg: 'Contraseña actualizada correctamente',
            }
        }catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                singOff,
                profileUpdate,
                passwordSave
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider,
};

export default AuthContext;