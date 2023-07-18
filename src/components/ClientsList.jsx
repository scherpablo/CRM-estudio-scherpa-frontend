import useClients from "../hooks/useClients"
import Client from "./Client"

const Clients = () => {
    const { clients } = useClients()

    return (
        <>
            {clients.length ?
                (
                    <>
                        <h2 className="font-black text-3xl text-center text-white mb-5">Listado de clientes</h2>

                        <p
                            className="text-md font-bold text-center text-white">
                            Administra tus
                            <span
                                className="text-yellow-600 font-bold"> Clientes
                            </span>
                        </p>
                        {clients.map(client => (
                            <Client
                                key={client._id}
                                client={client}
                            />
                        ))}
                    </>
                ) :
                (
                    <>
                        <h2 className="font-black text-3xl text-center text-white mb-5">No hay clientes</h2>
                        <p
                            className="text-md font-bold text-center text-white">
                            Comienza agregando
                            <span
                                className="text-yellow-600 font-bold"> Clientes
                            </span>
                        </p>
                    </>
                )}
        </>
    )
}

export default Clients