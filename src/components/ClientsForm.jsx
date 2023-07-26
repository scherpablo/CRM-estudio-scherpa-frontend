import { useState, useEffect } from "react";
import Alerts from "./Alerts";
import useClients from "../hooks/useClients";

const Form = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cuit, setCuit] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [anses, setAnses] = useState('');
    const [afip, setAfip] = useState('');
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState({});

    const { clientSave, client } = useClients();

    useEffect(() => {
        if (Object.keys(client).length > 0) {
            setName(client.name);
            setLastName(client.lastName);
            setCuit(client.cuit);
            setBirthdate(new Date(client.birthdate).toISOString().split('T')[0]);
            setEmail(client.email);
            setPhone(client.phone);
            setAddress(client.address);
            setLocation(client.location);
            setPostalCode(client.postalCode);
            setAnses(client.anses);
            setAfip(client.afip);
            setId(client._id);
        }
    }, [client])

    const handleSubmit = async e => {
        e.preventDefault();
        if ([name, lastName, birthdate].includes('')) {
            setAlert({
                msg: 'Nombre, Apellido y Nacimineto Obligatorios',
                error: true
            });
            return;
        }
        if (id) {
            clientSave({
                name,
                lastName,
                cuit,
                birthdate,
                email,
                phone,
                address,
                location,
                postalCode,
                anses,
                afip,
                id
            });
            setAlert({
                msg: 'Cliente Editado Correctamente',
            });
        } else {
            clientSave({
                name,
                lastName,
                cuit,
                birthdate,
                email,
                phone,
                address,
                location,
                postalCode,
                anses,
                afip,
                id
            });
            setAlert({
                msg: 'Cliente Agregado Correctamente',
            });
        }
        setTimeout(() => {
            setAlert({});
            setId(null);
        }, 3000);

        setName('');
        setLastName('');
        setCuit('');
        setBirthdate('');
        setEmail('');
        setPhone('');
        setAddress('');
        setLocation('');
        setPostalCode('');
        setAnses('');
        setAfip('');
    }

    const { msg } = alert;

    return (
        <>
            <h2 className="font-black text-3xl text-center text-white mb-5 hidden md:block">Administrador de clientes</h2>

            <p
                className="text-md font-bold text-center text-white hidden md:block">
                Agregar y Administrar
                <span
                    className="text-yellow-600 font-bold"> Clientes
                </span>
            </p>
            <form
                className="rounded-lg md:py-5 md:px-5 md:mb-0 bg-neutral-800 mx-5 my-5"
                onSubmit={handleSubmit}
            >
                <div className="mt-5">
                    <label htmlFor="name" className="text-white text-md uppercase font-bold">Nombre</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="name"
                        placeholder="ingresar nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="lastName" className="text-white text-md uppercase font-bold">Apellido</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="lastName"
                        placeholder="ingresar apellido"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="cuit" className="text-white text-md uppercase font-bold">Cuit | Cuil</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="cuit"
                        placeholder="ingresar cuit | cuil"
                        value={cuit}
                        onChange={e => setCuit(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="birthday" className="text-white text-md uppercase font-bold">Nacimiento</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="date"
                        id="birthday"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="email" className="text-white text-md uppercase font-bold">Correo</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="email"
                        id="email"
                        placeholder="ingresar correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="phone" className="text-white text-md uppercase font-bold">Telefono</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="phone"
                        placeholder="ingresar teléfono"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="address" className="text-white text-md uppercase font-bold">Domicilio</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="address"
                        placeholder="ingresar domicilio"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="location" className="text-white text-md uppercase font-bold">Localidad</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="location"
                        placeholder="ingresar localidad"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="postalCode" className="text-white text-md uppercase font-bold">Codigo Postal</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="postalCode"
                        placeholder="ingresar código postal"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)
                        }
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="anses" className="text-white text-md uppercase font-bold">Anses</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="anses"
                        placeholder="ingresar contraseña"
                        value={anses}
                        onChange={e => setAnses(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <label htmlFor="afip" className="text-white text-md uppercase font-bold">Afip</label>
                    <input
                        className="border w-full p-2 mt-3 rounded-md"
                        type="text"
                        id="afip"
                        placeholder="ingresar contraseña"
                        value={afip}
                        onChange={e => setAfip(e.target.value)}
                    />
                </div>
                <div className="mt-5">
                    <input
                        className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-yellow-800"
                        type="submit"
                        value={id ? 'Guardar Cambios' : 'Agregar Cliente'}
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

export default Form