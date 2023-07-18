import { useState, useEffect } from "react";
import Alerts from "../components/Alerts";
import useExpedients from "../hooks/useExpedients";

const ExpedientsForm = () => {
    const [number, setNumber] = useState('');
    const [type, setType] = useState('');
    const [law, setLaw] = useState('');
    const [state, setState] = useState('');
    const [startDate, setStartDate] = useState('');
    const [clientRelation, setClientRealtion] = useState('');
    const [id, setId] = useState('');

    const [alert, setAlert] = useState({});

    const { expedientSave, expedient } = useExpedients()

    useEffect(() => {
        if (Object.keys(expedient).length > 0) {
            setNumber(expedient.number);
            setType(expedient.type);
            setLaw(expedient.law);
            setState(expedient.state);
            setStartDate(new Date(expedient.startDate).toISOString().split('T')[0]);
            setClientRealtion(expedient.clientRelation);
            
            setId(expedient._id);
        }
    }, [expedient])

    const handleSubmit = e => {
        e.preventDefault();

        if ([number, clientRelation].includes('')) {
            setAlert({
                msg: 'Numero de Expte y Cliente Obligatorios',
                error: true
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
            return
        }
        if (id) {
            expedientSave({
                number,
                type,
                law,
                state,
                startDate,
                clientRelation,
                id
            })
            setAlert({
                msg: 'Expediente Editado Correctamente',
            });
        }else {
            expedientSave({
                number,
                type,
                law,
                state,
                startDate,
                clientRelation,
                id
            })
            setAlert({
                msg: 'Expediente Agregado Correctamente',
            });
        }        
        setTimeout(() => {
            setAlert({});
            setId(null);
        }, 3000);
        
        setNumber("");
        setType("");
        setLaw("");
        setState("");
        setStartDate("");
        setClientRealtion("");
    }

    const { msg } = alert;

    return (
        <>
            <h2 className="font-black text-3xl text-center text-white mb-5">Administrador de expedientes</h2>

            <p
                className="text-md font-bold text-center text-white">
                Agregar y Administrar
                <span
                    className="text-yellow-600 font-bold"> Expedientes
                </span>
            </p>
            <form
                className="rounded-lg py-5 px-5 mb-10 lg:mb-0 bg-neutral-800 mx-5 my-5"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <label htmlFor="number" className="text-white text-md uppercase font-bold">Numero de Expte</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="number"
                        placeholder="ingresar número de expediente"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="type" className="text-white text-md uppercase font-bold">Tipo de Expte</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="type"
                        placeholder="ingresar tipo de expediente"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="law" className="text-white text-md uppercase font-bold">Tipo de Ley</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="law"
                        placeholder="ingresar tipo de ley"
                        value={law}
                        onChange={(e) => setLaw(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="state" className="text-white text-md uppercase font-bold">Estado de Expte</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="state"
                        placeholder="ingresar estado del expediente"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="startDate" className="text-white text-md uppercase font-bold">Fecha de Inicio</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="clientRelation" className="text-white text-md uppercase font-bold">Cliente Relacionado</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="clientRelation"
                        placeholder="ingresar cliente relacionado"
                        value={clientRelation}
                        onChange={(e) => setClientRealtion(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <input
                        className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-yellow-800"
                        type="submit"
                        value={id ? 'Guardar Cambios' : 'Agregar Expediente'}
                    />
                </div>
                <div className="mt-5">
                    {msg && <Alerts
                        alert={alert}
                    />}
                </div>
            </form>
        </>
    )
}

export default ExpedientsForm