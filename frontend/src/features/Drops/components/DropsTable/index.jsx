import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../../User/userSlice';
import { getDrops } from '../../dropsActions'
import { dropSelector } from '../../dropSlice'

const index = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, isSuccess, isError, drops } = useSelector(dropSelector);
    const user = useSelector(userSelector)

    useEffect(() => {
        dispatch(getDrops())
    }, [])


    return (
        <div className=' w-full flex flex-row justify-center items-center'>
            <div className="w-8/12" >
                <p className='my-16 font-semibold text-4xl'>Hi, {user.username}</p>
                <div className="pb-2">
                    <div className="relative flex mt-1 justify-between items-center">
                        <h1 className='text-gray-800 text-3xl font-bold'>All drops</h1>

                        {user.user_type !== "minting_vendor" &&
                            <button onClick={() => navigate('/drops/create')} className="py-4 border shadow-md border-gray-300 text-white text-lg rounded-lg block w-60 bg-gray-800">Create Drop</button>
                        }
                    </div>
                </div>
                <table className="w-full text-sm text-left  text-gray-400 mb-6">
                    <thead className="text-xs bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID
                                </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                                </th>
                            <th scope="col" className="px-6 py-3">
                                Time Created
                                </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                                </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                                </th>
                        </tr>
                    </thead>
                    <tbody>

                        {isFetching ? (
                            <div className='w-full'>
                                <div className='w-full' ><h1>Loading...</h1></div>
                            </div>

                        ) :
                            drops.length ? (
                                drops.map(drop => (
                                    <tr
                                        key={drop.id}
                                        className=" border-b bg-gray-800 border-gray-700  hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                            {drop.id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {drop.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(drop.created_at).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {drop.status || (<span>Waing</span>)}
                                        </td>
                                        {/* Client buttons  */}
                                        {user.user_type === 'client' && (
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Review</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Cancel</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Publish</a>
                                            </td>
                                        )}
                                        {/* Minting vendor buttons  */}
                                        {user.user_type === 'minting_vendor' && (
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Review</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Download (.tar)</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Upload (.json)</a>
                                            </td>
                                        )}
                                        {/* System admin buttons  */}
                                        {user.user_type === 'admin' && (
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Review</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Download (.tar)</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Upload (.json)</a>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Cancel</a>
                                            </td>
                                        )}

                                    </tr>
                                ))
                            )
                                : (<h1>No drops yet!</h1>)
                        }
                    </tbody>
                </table>
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
