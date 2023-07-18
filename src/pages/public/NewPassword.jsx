import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import Alerts from "../../components/Alerts";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const apiAdminsUrl = import.meta.env.VITE_API_ADMINS_URL;

const passwordChangeUrl = backendUrl + apiAdminsUrl + `/password-change`;

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({});
    const [tokenValid, setTokenValid] = useState(false);
    const [modifiedPassword, setModifiedPassword] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const validToken = async () => {
            try {
                await axios(`${passwordChangeUrl}/${token}`);
                setTokenValid(true);
                setAlert({
                    msg: 'Ingresa tu nueva contraseña',
                });
            } catch (error) {
                setAlert({
                    msg: 'Hubo un error con el enlace, intenta de nuevo',
                    error: true
                });
            }
        }
        validToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({});
        }, 5000);

        return () => clearTimeout(timer);
    }, [alert]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            setAlert({
                msg: 'La contraseña debe tener al menos 6 caracteres',
                error: true
            });
            return;
        }
        try {
            const url = `${passwordChangeUrl}/${token}`;
            const { data } = await axios.post(url, { password });
            setAlert({
                msg: data.msg,
                error: false
            })
            setModifiedPassword(true);
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
                <h1 className="text-yellow-600 font-black text-7xl text-center">Reestablece tu contraseña y continua administrando tus <span className="text-white">clientes</span></h1>
            </div>
            <div className="p-8 mt-20 md:mt5 shadow-lg bg-neutral-800 rounded-lg">
                {msg && <Alerts
                    alert={alert}
                />}
                {tokenValid && (
                    <>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className="my-5">
                                <label className="uppercase text-white block text-md font-bold">Nueva Contraseña</label>
                                <input
                                    className="border w-full p-2 mt-3 rounded-md"
                                    type="password"
                                    placeholder="ingresa tu nueva contraseña"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            {!modifiedPassword ? (
                                <input
                                    className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold mt-10 hover:cursor-pointer hover:bg-yellow-800 md:w-auto"
                                    type="submit"
                                    value="Confirmar Contraseña"
                                />
                            ) : (
                                <Link to="/" className="text-gray-400 block text-center text-md font-bold mt-3">Iniciar Sesión</Link>
                            )}
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

export default NewPassword