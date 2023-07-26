/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const ClientsContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_PROD;
const apiClientsUrl = import.meta.env.VITE_API_CLIENTS_URL;

const createClientUrl = backendUrl + apiClientsUrl;
const getClienstUrl = backendUrl + apiClientsUrl;
const updateClientUrl = backendUrl + apiClientsUrl;
const deleteClientUrl = backendUrl + apiClientsUrl;

const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});

    const { auth } = useAuth();

    useEffect(() => {
        const getClients = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
                const { data } = await axios(getClienstUrl, config);
                setClients(data);
            } catch (error) {
                console.log(error);
            }
        }
        getClients();
    }, [auth])

    const clientSave = async (client) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        if (client.id) {
            try {
                const { data } = await axios.put(updateClientUrl + `/${client.id}`, client, config);
                const updateClient = clients.map(clientState => clientState._id === data._id ? data : clientState);
                setClients(updateClient);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        } else {
            try {
                const { data } = await axios.post(createClientUrl, client, config);
                const { createdAt, updatedAt, __v, ...clientSaved } = data;
                setClients([clientSaved, ...clients]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    const setEdition = (client) => {
        setClient(client)
    }

    const setCancelEdition = () => {
        setClient({
            name: '',
            lastName: '',
            cuit: '',
            birthdate: null,
            email: '',
            phone: '',
            address: '',
            location: '',
            postalCode: '',
            anses: '',
            afip: '',
        })
    }

    const deleteClient = async (id) => {
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
                const { data } = await axios.delete(deleteClientUrl + `/${id}`, config);
                const updateClient = clients.filter(clientState => clientState._id !== id);
                setClients(updateClient);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }

    return (
        <ClientsContext.Provider
            value={{
                clients,
                clientSave,
                setEdition,
                setCancelEdition,
                client,
                deleteClient
            }}
        >
            {children}
        </ClientsContext.Provider>
    )
}

export {
    ClientsProvider
}

export default ClientsContext;