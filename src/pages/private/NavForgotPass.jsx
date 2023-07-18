import { Link } from "react-router-dom";

const NavForgotPass = () => {
    return (
        <nav className="flex justify-center lg:justify-start gap-5 mx-5">
            <Link
                className="nav-link font-bold uppercase text-white"
                to="/admin/profile">Editar Perfil
            </Link>
            <Link
                className="nav-link font-bold uppercase text-white"
                to="/admin/forgot-password">Cambiar Password
            </Link>
        </nav>
    )
}

export default NavForgotPass