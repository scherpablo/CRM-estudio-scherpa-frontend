/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { singOff } = useAuth();
    return (
        <header className="py-10 bg-yellow-600 pl-10 pr-10">
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                <Link to="/admin">
                    <h1 className="text-3xl font-bold mb-5 lg:mb-0 text-center hidden md:block">Administrador de {''}
                        <span
                            className="text-white font-black">Clientes
                        </span>
                        <p className="text-sm text-center text-white lg:text-left">Estudio Jurídico
                            <span className="text-black"> Dra. Lis Scherpa</span>
                        </p>
                    </h1>
                </Link>

                <nav className="flex gap-4 text-black flex-col lg:flex-row items-center">
                    <Link to="/admin/clients" className="text-md uppercase font-bold hover:text-white font-mono">Clientes</Link>
                    <Link to="/admin/expedients" className="text-md uppercase font-bold hover:text-white font-mono">Expedientes</Link>
                    <Link to="/admin/profile" className="text-md uppercase font-bold hover:text-white font-mono">Perfil</Link>

                    <button
                        type="button"
                        className="text-md uppercase font-bold lg:hover:text-white hover:text-black font-mono"
                        onClick={singOff}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header;