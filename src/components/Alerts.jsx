/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
const Alerts = ({ alert }) => {
    return (
        <div className={`${alert.error ? 'from-red-600 to-red-700' : 'from-lime-600 to-lime-700'} bg-gradient-to-r p-3 text-center text-white font-bold rounded-md uppercase text-sm mb-10 `}>
            {alert.msg}
        </div>
    )
}

export default Alerts;