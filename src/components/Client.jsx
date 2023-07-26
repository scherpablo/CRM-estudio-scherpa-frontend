/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import useClients from "../hooks/useClients"
import Form from "./ClientsForm";

const Client = ({ client }) => {
    const { setEdition, setCancelEdition, deleteClient } = useClients()
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const { name, lastName, cuit, birthdate, email, phone, address, location, postalCode, anses, afip, _id } = client

    const formatDate = (birthdate) => {
        let newDate
        if (birthdate.includes('T00:00:00.000Z')) {
            newDate = new Date(birthdate.split('T')[0].split('-'))
        } else {
            newDate = new Date(birthdate)
        }
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric'
        }
        return newDate.toLocaleDateString('es-ES', options)
    }

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleEditCancelClick = () => {
        if (isEditing) {
            setCancelEdition(client);
            setIsEditing(false);
            // handleShowForm();
        } else {
            setEdition(client);
            setIsEditing(true);
            // handleShowForm();
        }
        handleShowForm();
    };

    const handleFormSubmit = () => {
        setIsEditing(false);
        setShowForm(false);
    };

    return (
        <div className="bg-neutral-800 shadow-md rounded-lg p-5 mx-5 my-5">
            <p className="font-bold uppercase text-white">Nombre:
                <span className="font-bold normal-case text-yellow-600"> {name}</span>
            </p>
            <p className="font-bold uppercase text-white">Apellido:
                <span className="font-bold normal-case text-yellow-600"> {lastName}</span>
            </p>
            <p className="font-bold uppercase text-white">Cuit/Cuil:
                <span className="font-bold normal-case text-yellow-600"> {cuit}</span>
            </p>
            <p className="font-bold uppercase text-white">Nacimiento:
                <span className="font-bold normal-case text-yellow-600"> {formatDate(birthdate)}</span>
            </p>
            <p className="font-bold uppercase text-white">Correo:
                <span className="font-bold normal-case text-yellow-600"> {email}</span>
            </p>
            <p className="font-bold uppercase text-white">Telefono:
                <span className="font-bold normal-case text-yellow-600"> {phone}</span>
            </p>
            <p className="font-bold uppercase text-white">Domicilio:
                <span className="font-bold normal-case text-yellow-600"> {address}</span>
            </p>
            <p className="font-bold uppercase text-white">Localidad:
                <span className="font-bold normal-case text-yellow-600"> {location}</span>
            </p>
            <p className="font-bold uppercase text-white">Codigo Postal:
                <span className="font-bold normal-case text-yellow-600"> {postalCode}</span>
            </p>
            <p className="font-bold uppercase text-white">Anses:
                <span className="font-bold normal-case text-yellow-600"> {anses}</span>
            </p>
            <p className="font-bold uppercase text-white">Afip:
                <span className="font-bold normal-case text-yellow-600"> {afip}</span>
            </p>
            <div className="flex justify-between">
                <button
                    className={`bg-${isEditing ? 'yellow' : 'yellow'}-600 py-2 px-5 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-${isEditing ? 'yellow' : 'yellow'}-800`}
                    type="button"
                    onClick={handleEditCancelClick}
                >
                    {isEditing ? 'Cancelar' : 'Editar'}
                </button>
                <button
                    className="bg-red-600 py-2 px-5 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-red-800"
                    type="button"
                    onClick={() => deleteClient(_id)}
                >
                    Eliminar
                </button>
            </div>
            <div className="md:hidden mb-0">
                {showForm && <Form onSubmitForm={handleFormSubmit} />}
            </div>
        </div>
    )
}

export default Client