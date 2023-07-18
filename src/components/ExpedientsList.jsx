import useExpedients from "../hooks/useExpedients"
import Expedient from "./Expedient"

const ExpedientsList = () => {
    const { expedients } = useExpedients()

    return (
        <>
            {expedients.length ?
                (
                    <>
                        <h2 className="font-black text-3xl text-center text-white mb-5">Listado de expedientes</h2>

                        <p
                            className="text-md font-bold text-center text-white">
                            Administra tus
                            <span
                                className="text-yellow-600 font-bold"> Expedientes
                            </span>
                        </p>
                        {expedients.map(expedient => (
                            <Expedient
                                key={expedient._id}
                                expedient={expedient}
                            />
                        ))}
                    </>
                ) :
                (
                    <>
                        <h2 className="font-black text-3xl text-center text-white mb-5">No hay expedientes</h2>
                        <p
                            className="text-md font-bold text-center text-white">
                            Comienza agregando
                            <span
                                className="text-yellow-600 font-bold"> Expedientes
                            </span>
                        </p>
                    </>
                )}
        </>
    )
}

export default ExpedientsList