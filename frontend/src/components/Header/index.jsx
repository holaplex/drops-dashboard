import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userSelector } from '../../features/User/userSlice';

const index = ({ selected }) => {
    const navigate = useNavigate();
    const user = useSelector(userSelector)
    const [isOpen, setIsOpen] = useState(false)
    const onLogOut = () => {
        localStorage.clear();
        navigate('/login');
    };
    return (
        <div className="antialiased border-b-2 bg-gray-900">
            <div className="w-full text-gray-200 bg-gray-800">
                <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                    <div className="flex flex-row items-center justify-between p-4">
                        <p href="#" className="text-lg font-semibold tracking-widest uppercase rounded-lg text-white focus:outline-none focus:shadow-outline">Holaplex Drop</p>
                        <button className="rounded-lg md:hidden focus:outline-none focus:shadow-outline" onClick={() => setIsOpen(!isOpen)}>
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                <path className={`${isOpen && 'hidden'}`} fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" ></path>
                                <path className={`${!isOpen && 'hidden'}`} fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path>
                            </svg>
                        </button>
                    </div>
                    <nav className={`flex-col flex-grow ${isOpen ? 'flex' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
                        {navItems.map((item, index) => {
                            if (item.isOnlyAdmin && user.user_type !== "admin") return null;

                            return (
                                <Link key={index} className={`${selected === item.label ? "bg-white text-gray-900" : "text-gray-200 bg-transparent"} px-4 py-2 mt-2 text-sm font-semibold rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:text-white hover:text-white md:mt-0 md:ml-4  focus:outline-none focus:shadow-outline`} to={item.href}>{item.label}</Link>
                            )
                        })}
                        <button onClick={() => onLogOut()} className="ml-5 px-4 py-2 mt-8 bg-red-800 text-white text-sm font-semibold rounded-lg md:mt-0">
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
        </div >
    )
}

export default index
const navItems = [
    {
        label: 'Drops',
        href: '/drops'
    },
    {
        label: 'Users',
        href: '/users',
        isOnlyAdmin: true
    },
]
