import PropTypes from 'prop-types';

function Sidebar({ isOpen }) {
    return (
        <>
            <div
                className={`fixed top-[70px] left-0 z-40 w-56 h-screen p-0 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-white dark:bg-[#c61a09]`}
                aria-labelledby="drawer-navigation-label"
            >
                <div className="py-2 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {['Estudiantes', 'Empleados', 'Becas', 'Viandas', 'Sign In', 'Sign Up'].map((item, index) => (
                            <li key={index}>
                                <a
                                    href={"/" + item}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        {/* Aquí puedes reemplazar con los íconos correspondientes */}
                                        <path d="..." />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">{item}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default Sidebar