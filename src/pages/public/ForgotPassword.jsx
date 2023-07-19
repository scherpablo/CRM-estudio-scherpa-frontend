import { useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Alerts from "../../components/Alerts";

const backendUrl = import.meta.env.VITE_BACKEND_URL|| import.meta.env.VITE_BACKEND_URL_PROD;
// const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
const apiAdminsUrl = import.meta.env.VITE_API_ADMINS_URL;

const passwordChangeUrl = backendUrl + apiAdminsUrl + `/password-change`;

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});
    const [modifiedPassword, setModifiedPassword] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({});
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "") {
            setAlert({
                msg: "El correo es obligatorio",
                error: true,
            });
            return;
        }

        try {
            const { data } = await axios.post(passwordChangeUrl, { email });
            setAlert({
                msg: data.msg,
            })
            setModifiedPassword(true);
            setEmail("");
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    }

    const { msg } = alert;

    return (
        <>
            <div>
                <h1 className="text-yellow-600 font-black text-5xl lg:text-7xl text-center lg:mt-14">Recupera tu cuenta y no pierdas tus <span className="text-white">clientes</span></h1>
            </div>
            <div className="p-5 mt-8 shadow-lg bg-neutral-800 rounded-lg">
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
                    {!modifiedPassword && (
                        <input
                            className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold mt-10 hover:cursor-pointer      hover:bg-yellow-800 md:w-auto"
                            type="submit"
                            value="Reestablecer Contraseña"
                        />
                    )}
                    <nav className="mt-10 lg:flex lg:justify-between">
                        <Link to="/" className="text-gray-400 block text-center text-md font-bold mt-3">¿Ya tienes una cuenta? Inicia sesión</Link>
                        <Link to="/register" className="text-gray-400 block text-center text-md font-bold mt-3">¿No tienes una cuenta? Registrate</Link>
                    </nav>
                </form>
            </div>

        </>
    )
}

export default ForgotPassword