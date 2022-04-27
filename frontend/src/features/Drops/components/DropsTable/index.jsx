import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../../User/userSlice';

const index = () => {
    const navigate = useNavigate();
    const user = useSelector(userSelector)
    return (
        <div className=' w-screen h-screen overflow-y-auto'>
            <div class="max-w-5xl mx-auto">
                <div class="relative overflow-x-auto">
                    <p className='my-16 max-w-5xl font-semibold text-4xl'>Hi, {user.username}</p>
                    <div class="pb-2">
                        <div class="relative flex mt-1 justify-between items-center">
                            <h1 className='text-gray-800 text-3xl font-bold'>All drops</h1>

                            {user.user_type !== "minting_vendor" &&
                                <button onClick={() => navigate('/drops/create')} class="py-4 border shadow-md border-gray-300 text-white text-lg rounded-lg block w-60 bg-gray-800">Create Drop</button>}
                        </div>
                    </div>
                    <table class="w-full text-sm text-left  text-gray-400">
                        <thead class="text-xs bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Time Created
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dropsSample.map((item, index) => {
                                return (
                                    <tr
                                        class=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-medium text-white whitespace-nowrap">
                                            {item.id}
                                        </th>
                                        <td class="px-6 py-4">
                                            {item.name}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.created_at}
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.status}
                                        </td>
                                        <td class="px-6 py-4">
                                            <a href="#" class="font-medium text-blue-500 hover:underline mr-2">Review</a>
                                            <a href="#" class="font-medium text-blue-500 hover:underline mr-2">Inactive</a>
                                            <a href="#" class="font-medium text-blue-500 hover:underline mr-2">Publish</a>
                                        </td>
                                    </tr>
                                )
                            })}

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
        name: "April Drop#1",
        status: "Waiting"
    },
    {
        id: 0,
        name: "April Drop#1",
        status: "Waiting"
    },
    {
        id: 0,
        name: "April Drop#1",
        status: "Waiting"
    },
    {
        id: 0,
        name: "April Drop#1",
        status: "Waiting"
    },
    {
        id: 0,
        name: "April Drop#1",
        status: "Waiting"
    },
    {
        id: 0,
        name: "April Drop#1",
        status: "Waiting"
    },
    {
        id: 0,
        name: "April Drop#1",
        status: "Waiting"
    },
]