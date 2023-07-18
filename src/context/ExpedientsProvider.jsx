import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const ExpedientsContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_PROD;
// const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
const apiExpedientsUrl = import.meta.env.VITE_API_EXPEDIENTS_URL;

const createExpedientUrl = backendUrl + apiExpedientsUrl;
const getExpedientsUrl = backendUrl + apiExpedientsUrl;
const updateExpedientUrl = backendUrl + apiExpedientsUrl;
const deleteExpedientUrl = backendUrl + apiExpedientsUrl;

// eslint-disable-next-line react/prop-types
const ExpedientsProvider = ({ children }) => {
    const [expedients, setExpedients] = useState([]);
    const [expedient, setExpedient] = useState({});


    const { auth } = useAuth();

    useEffect(() => {
        const getExpedients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await axios(getExpedientsUrl, config);
                setExpedients(data);
            } catch (error) {
                console.log(error);
            }
        }
        getExpedients();
    }, [auth])

    const expedientSave = async (expedient) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        if (expedient.id) {
            try {
                const { data } = await axios.put(updateExpedientUrl + `/${expedient.id}`, expedient, config);
                const updateExpedients = expedients.map(expedientState => expedientState._id === data._id ? data : expedientState);
                setExpedients(updateExpedients);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const { data } = await axios.post(createExpedientUrl, expedient, config);
                // eslint-disable-next-line no-unused-vars
                const { createdAt, updatedAt, __v, ...expedientSaved } = data;
                setExpedients([expedientSaved, ...expedients]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdition = (expedient) => {
        setExpedient(expedient)
    }

    const deleteExpedient = async (id) => {
        const confirmDelete = confirm('¿Deseas eliminar este cliente?');
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            try {
                // eslint-disable-next-line no-unused-vars
                const { data } = await axios.delete(deleteExpedientUrl + `/${id}`, config);
                const updateExpedient = expedients.filter(expedientState => expedientState._id !== id);
                setExpedients(updateExpedient);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    return (
        <ExpedientsContext.Provider
            value={{
                expedients,
                expedientSave,
                setEdition,
                expedient,
                deleteExpedient
            }}
        >
            {children}
        </ExpedientsContext.Provider>
    )
}

export {
    ExpedientsProvider
}

export default ExpedientsContext