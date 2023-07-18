

const Footer = () => {
    const getCurrentYear = () => {
        const currentYear = new Date().getFullYear();
        return currentYear;
    };
    return (
        <>
            <footer className="py-10 text-center">
                <p className="text-white text-sm">
                    {`© ${getCurrentYear()} - Estudio Jurídico Dra. Lis Scherpa`}
                </p>
                <p className="text-white text-sm">
                    Creación y Desarrollo | <a href="https://pabloscherpa.com.ar" target="_blank" rel="noopener noreferrer"><span className="text-yellow-600 font-bold">PABLO SCHERPA</span></a>
                </p>
            </footer>
        </>
    )
}

export default Footer