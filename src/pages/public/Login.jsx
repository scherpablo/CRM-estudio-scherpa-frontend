import { useState, useEffect } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Alerts from "../../components/Alerts"
import useAuth from "../../hooks/useAuth"

const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_PROD;
const apiAdminsUrl = import.meta.env.VITE_API_ADMINS_URL;

const authUserUrl = backendUrl + apiAdminsUrl + `/login`;

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { setAuth } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({});
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert]);

    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            return;
        }

        try {
            // const { data } = await axios.post(authUserUrl, { email, password });
            const { data } = await axios.post(authUserUrl, { email, password });
            localStorage.setItem("token", data.token);
            setEmail("");
            setPassword("");
            setAuth(data)
            navigate("/admin")
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    }

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="text-yellow-600 font-black text-7xl text-center">Inicia sesión para acceder los <span className="text-white">clientes</span></h1>
                <p className="text-center text-white mt-5 text-xl">Estudio Jurídico Dra. <span className="text-yellow-600 uppercase font-bold"> Lis Scherpa</span> </p>
            </div>
            <div className="p-8 mt-20 md:mt5 shadow-lg bg-neutral-800 rounded-lg">
                {msg && <Alerts
                    alert={alert}
                />}
                <form
                    onSubmit={handleSubmit}
                >
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
                        className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-yellow-800 md:w-auto"
                        type="submit"
                        value="Iniciar sesión"
                    />
                    <nav className="mt-10 lg:flex lg:justify-between">
                        <Link to="/register" className="text-gray-400 block text-center text-md font-bold mt-3">¿No tienes una cuenta? Registrate</Link>
                        <Link to="/forgot-password" className="text-gray-400 block text-center text-md font-bold mt-3">Olvide mi contraseña</Link>
                    </nav>
                </form>
            </div>
        </>
    )
}

export default Login