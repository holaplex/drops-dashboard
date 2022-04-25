import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as userApi from '../../userApi';

const index = () => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllUsers() {
            const { data: users } = await userApi.index()
            setUsers(users)
        }
        getAllUsers()
    }, [])
    return (
        <div className=' w-screen h-screen overflow-y-auto'>

            <div className="max-w-5xl mt-28 mx-auto">
                <div className="relative overflow-x-auto">
                    <div className="pb-2">
                        <div className="relative flex mt-1 justify-between items-center">
                            <h1 className='text-gray-800 text-3xl font-bold'>All users</h1>
                            <button onClick={() => navigate('/users/create')} className="py-4 border shadow-md border-gray-300 text-white text-lg rounded-lg block w-60 bg-gray-800">Create User</button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left  text-gray-400">
                        <thead className="text-xs bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((item, index) => (
                                <tr key={index}
                                    className=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {item.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.user_type}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default index

const dropsSample = [
    {
        id: 0,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
    {
        id: 1,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
    {
        id: 2,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
    {
        id: 3,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
    {
        id: 4,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
    {
        id: 5,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
    {
        id: 6,
        username: "April Drop#1",
        email: "Waiting",
        user_type: "Waiting",
    },
]