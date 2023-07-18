import { useState } from "react";
import NavForgotPass from "./NavForgotPass"
import Alerts from "../../components/Alerts";
import useAuth from "../../hooks/useAuth";

const AdminForgotPass = () => {
    const { passwordSave } = useAuth({});

    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(password).some(value => value === "")) {
            setAlert({
                msg: "Todos los campos son obligatorios",
                error: true
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }
        if (password.newPassword.length < 6) {
            setAlert({
                msg: "La contraseña debe tener al menos 6 caracteres",
                error: true
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
            return;
        }
        const response = await passwordSave(password);
        setAlert(response);
    }

    const { msg } = alert;

    return (
        <>
            <NavForgotPass />
            <h2 className="text-center font-bold text-4xl mt-10 text-white">Cambia tu Contraseña</h2>
            <p className="text-center text-white text-xl mt-5 mb-10">Modifíca tu <span className="text-yellow-600 font-bold">contraseña aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-neutral-800 rounded-lg p-5">
                    {msg && <Alerts
                        alert={alert}
                    />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase text-white font-bold text-md">Contraseña Actual</label>
                            <input
                                className="border w-full p-2 mt-3 rounded-md"
                                type="password"
                                name="currentPassword"
                                placeholder="ingresar tu contraseña actual"
                                onChange={e => setPassword({ ...password, currentPassword: e.target.value })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase text-white font-bold text-md">Nueva Contraseña</label>
                            <input
                                className="border w-full p-2 mt-3 rounded-md"
                                type="password"
                                name="newPassword"
                                placeholder="ingresar la nueva contraseña"
                                onChange={e => setPassword({ ...password, newPassword: e.target.value })}
                            />
                        </div>

                        <div className="mt-3">
                            <input
                                className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-yellow-800"
                                type="submit"
                                value="Actualizar Contraseña"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminForgotPass