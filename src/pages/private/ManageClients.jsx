import { useState } from "react";
import Form from "../../components/ClientsForm";
import Clients from "../../components/ClientsList";

const ManageClients = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            <button
                className="bg-yellow-600 text-white uppercase font-bold text-center p-3 rounded-md mx-10 mb-5 md:hidden"
                type="button"
                onClick={() => setShowForm(!showForm)}
            >{showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
            </button>
            <div className={`${showForm ? 'block' : 'hidden'} md:block md:w-1/2 lg:w-1/2`}>
                <Form />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <Clients />
            </div>
        </div>
    )
}

export default ManageClients