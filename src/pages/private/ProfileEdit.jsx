import { useEffect, useState } from "react";
import NavForgotPass from "./NavForgotPass"
import useAuth from "../../hooks/useAuth"
import Alerts from "../../components/Alerts";

const ProfileEdit = () => {
    const { auth, profileUpdate } = useAuth();
    const [profile, setProfile] = useState({});
    const [alert, setAlert] = useState({});

    useEffect(() => {
        setProfile(auth);
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, lastName, email } = profile;
        if ([name, lastName, email].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true,
            })
            setTimeout(() => {
                setAlert({})
            }, 3000)
            return;  
        }
        const result = await profileUpdate(profile);
        setAlert(result);
    }

    const { msg } = alert;

    return (
        <>
            <NavForgotPass />
            <h2 className="text-center font-bold text-4xl mt-10 text-white">Hola {auth.name}</h2>
            <p className="text-center text-white text-xl mt-5 mb-10">Modifíca tus <span className="text-yellow-600 font-bold">datos aquí</span></p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-neutral-800 rounded-lg p-5">
                    {msg && <Alerts
                        alert={alert}
                    />}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="my-3">
                            <label className="uppercase text-white font-bold text-md">Nombre</label>
                            <input
                                className="border w-full p-2 mt-3 rounded-md"
                                type="text"
                                id="name"
                                name="name"
                                placeholder="ingresar nombre"
                                value={profile.name || ''}
                                onChange={e => setProfile({ ...profile, name: e.target.value })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase text-white font-bold text-md">Apellido</label>
                            <input
                                className="border w-full p-2 mt-3 rounded-md"
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="ingresar apellido"
                                value={profile.lastName || ''}
                                onChange={e => setProfile({ ...profile, lastName: e.target.value })}
                            />
                        </div>
                        <div className="my-3">
                            <label className="uppercase text-white font-bold text-md">Correo</label>
                            <input
                                className="border w-full p-2 mt-3 rounded-md"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="ingresar correo electrónico"
                                value={profile.email || ''}
                                onChange={e => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <div className="mt-3">
                            <input
                                className="bg-yellow-600 w-full py-2 px-10 rounded-md text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-yellow-800"
                                type="submit"
                                value="Guardar cambios"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfileEdit