/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useExpedients from "../hooks/useExpedients"

const Expedient = ({ expedient }) => {
    const { setEdition, deleteExpedient } = useExpedients()

    const { number, type, law, state, startDate, clientRelation, _id } = expedient 

    const formatDate = (startDate) => {
        let newDate
        if (startDate.includes('T00:00:00.000Z')) {
            newDate = new Date(startDate.split('T')[0].split('-'))
        } else {
            newDate = new Date(startDate)
        }
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric'
        }
        return newDate.toLocaleDateString('es-ES', options)
    }

    return (
        <div className="bg-neutral-800 shadow-md rounded-lg p-5 mx-5 my-5">
            <p className="font-bold uppercase text-white">Numero de Expte:
                <span className="font-bold normal-case text-yellow-600"> {number}</span>
            </p>
            <p className="font-bold uppercase text-white">Tipo de Expte:
                <span className="font-bold normal-case text-yellow-600"> {type}</span>
            </p>
            <p className="font-bold uppercase text-white">Tipo de Ley:
                <span className="font-bold normal-case text-yellow-600"> {law}</span>
            </p>
            <p className="font-bold uppercase text-white">Estado Expte:
                <span className="font-bold normal-case text-yellow-600"> {state}</span>
            </p>
            <p className="font-bold uppercase text-white">Fecha de Inicio:
                <span className="font-bold normal-case text-yellow-600"> {formatDate(startDate)}</span>
            </p>
            <p className="font-bold uppercase text-white">Cliente Relacionado:
                <span className="font-bold normal-case text-yellow-600"> {clientRelation}</span>
            </p>
            <div className="flex justify-between">
                <button
                    className="bg-yellow-600 py-2 px-5 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-yellow-800"
                    type="button"
                    onClick={() => setEdition(expedient)}
                >Editar
                </button>
                <button
                    className="bg-red-600 py-2 px-5 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-red-800"
                    type="button"
                    onClick={() => deleteExpedient(_id)}
                >Eliminar
                </button>
            </div>
        </div>
    )
}

export default Expedient