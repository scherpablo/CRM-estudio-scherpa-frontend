import { Outlet  } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 mt-5 gap-8 p-10 pl-8 pr-8 items-center">
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout