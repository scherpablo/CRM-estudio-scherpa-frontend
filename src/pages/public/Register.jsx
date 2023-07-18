import { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Alerts from "../../components/Alerts";

const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_PROD;
// const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
const apiAdminsUrl = import.meta.env.VITE_API_ADMINS_URL;

const registerUrl = backendUrl + apiAdminsUrl;

const Register = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [alert, setAlert] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({});
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, lastName, email, password].includes("")) {
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }
        if (password.length < 6) {
            setAlert({
                msg: "La contraseña debe tener al menos 6 caracteres",
                error: true
            });
            return;
        }
        setAlert({});

        //Crear el Admin en la BD
        try {
            await axios.post(registerUrl, { name, lastName, email, password });
            setAlert({
                msg: "registro exitoso, revisa tu correo para verificar tu cuenta",
                error: false
            })
            setName("");
            setLastName("");
            setEmail("");
            setPassword("");
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="text-yellow-600 font-black text-7xl text-center">Crea tu cuenta y administra tus <span className="text-white">clientes</span></h1>
                <p className="text-center text-white mt-5 text-xl">Estudio Jurídico Dra. <span className="text-yellow-600 uppercase font-bold">Scherpa Lis</span> </p>
            </div>
            <div className="p-8 mt-5 md:mt5 shadow-lg bg-neutral-800 rounded-lg">
                {msg && <Alerts
                    alert={alert}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                        <label className="uppercase text-white block text-md font-bold">Nombre</label>
                        <input
                            className="border w-full p-2 mt-3 rounded-md"
                            type="text"
                            placeholder="ingresa tu nombre"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-white block text-md font-bold">Apellido</label>
                        <input
                            className="border w-full p-2 mt-3 rounded-md"
                            type="text"
                            placeholder="ingresa tu apellido"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-white block text-md font-bold">Correo</label>
                        <input
                            className="border w-full p-2 mt-3 rounded-md"
                            type="email"
                            placeholder="ingresa tu correo"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-white block text-md font-bold">Contraseña</label>
                        <input
                            className="border w-full p-2 mt-3 rounded-md"
                            type="password"
                            placeholder="ingresa tu contraseña"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <input
                        className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold mt-10 hover:cursor-pointer hover:bg-yellow-800 md:w-auto"
                        type="submit"
                        value="Registrar"
                    />
                    <nav className="mt-10 lg:flex lg:justify-between">
                        <Link to="/" className="text-gray-400 block text-center text-md font-bold mt-3">¿Ya tienes una cuenta? Inicia sesión</Link>
                        <Link to="/forgot-password" className="text-gray-400 block text-center text-md font-bold mt-3">Olvide mi contraseña</Link>
                    </nav>
                </form>
            </div>
        </>
    )
}

export default Register