import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '../../../User/userSlice';
import { getDrops, uploadMint, publish } from '../../dropsActions'
import { clearState, dropSelector } from '../../dropSlice'
import { DOWNLOAD_DIR } from '../../../../helpers/requestHelper'

const index = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isFetching, isSuccess, isError, drops } = useSelector(dropSelector);
    const user = useSelector(userSelector)
    const [file, setFile] = useState()

    const [showModal, setShowModal] = useState(false);
    const [selectedDrop, setSelectedDrop] = useState()

    useEffect(() => {
        dispatch(getDrops())
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatch(getDrops())
            dispatch(clearState())
        }

    }, [isFetching, isSuccess, isError])

    const handleModal = (drop_id) => {
        setSelectedDrop(drop_id)
        setShowModal(true)
    }
    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("drop_id", selectedDrop)

        dispatch(uploadMint(formData))
        setShowModal(false)
    }

    const handleReview = (drop_id) => {
        navigate(`/drops/review/${drop_id}`)
    }

    const handlePublish = async (drop_id) => {
        dispatch(publish(drop_id))
    }

    return (
        <div className=' w-full flex flex-row justify-center items-center'>
            <div className="w-8/12" >
                <p className='my-6 font-semibold text-4xl'>Hi, {user.username}</p>
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
                                        {
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleReview(drop.id)} className="font-medium text-blue-500 hover:underline mr-2">Review</button>
                                                <a href="#" className="font-medium text-blue-500 hover:underline mr-2">Cancel</a>
                                                <button onClick={() => handlePublish(drop.id)} className="font-medium text-blue-500 hover:underline mr-2">Publish</button>
                                            </td>
                                        }
                                    </tr>
                                ))
                            )
                                : (<h1>No drops yet!</h1>)
                        }
                    </tbody>
                </table>

                {showModal && (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Upload file
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                            Select a file and upload
                                        </p>
                                        <input onChange={f => setFile(f.target.files[0])} type='file' className='input' />
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="p-2 border shadow-md border-gray-300 text-white text-lg rounded-lg block bg-gray-800"
                                            type="button"
                                            onClick={handleUpload}
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )}
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
