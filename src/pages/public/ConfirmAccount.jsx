import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alerts from "../../components/Alerts";

const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL_PROD;
// const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD;
const apiAdminsUrl = import.meta.env.VITE_API_ADMINS_URL;

const confirmAccountUrl = backendUrl + apiAdminsUrl + `/confirm`;

const ConfirmAccount = () => {
    const [accountConfirmed, setAccountConfirmed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({});

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                // const url = `${confirmAccountUrl}/${token}`;
                const url = confirmAccountUrl + `/${token}`;
                const { data } = await axios(url);
                setAccountConfirmed(true);
                setAlert({
                    msg: data.msg,
                });
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                });
            }
            setLoading(false);
        }
        confirmAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className="items-center">
                <h1 className="text-yellow-600 font-black text-5xl lg:text-7xl text-center">Crea tu cuenta y administra tus <span className="text-white">clientes</span></h1>
            </div>
            <div className="p-5 mt-8 shadow-lg bg-neutral-800 rounded-lg">
                {!loading && <Alerts
                    alert={alert}
                />}
                {accountConfirmed && (
                    <Link to="/" className="text-gray-400 block text-center text-md font-bold mt-3">Iniciar Sesión</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmAccount