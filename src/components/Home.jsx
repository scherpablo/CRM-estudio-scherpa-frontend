import useAuth from "../hooks/useAuth";

const Home = () => {
    const { auth, loading } = useAuth();
    if (loading) return "Cargando..."

    return (
        <main className="container mx-auto mt-10 lg:mt-32">
            <h1 className="text-white text-6xl font-black text-center mb-5">Hola <span className="text-yellow-600">{auth.name}...</span></h1>
            <h2 className="text-white text-4xl font-black text-center mb-5">Estas en la seccion de administración de {''}</h2>
            <h2 className="text-yellow-600 text-center text-4xl font-black">Clientes <span className="text-white">y</span> Expedientes</h2>
            {/* <Outlet /> */}
            <p className="text-white text-xl text-center mt-10">Puedes acceder a ellos desde los enlaces de la barra de navegación</p>
        </main>
    )
}

export default Home