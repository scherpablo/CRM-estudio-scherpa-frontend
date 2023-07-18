import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const ExpedientsContext = createContext();

const createExpedientUrl = import.meta.env.VITE_CREATE_EXPEDIENT_URL;
const getExpedientsUrl = import.meta.env.VITE_GET_EXPEDIENTS_URL;
const updateExpedientUrl = import.meta.env.VITE_UPDATE_EXPEDIENT_URL;
const deleteExpedientUrl = import.meta.env.VITE_DELETE_EXPEDIENT_URL;

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