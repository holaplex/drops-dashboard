import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMAGE_DIR } from '../../../../helpers/requestHelper';
import { userSelector } from '../../../User/userSlice';
import { getDrops, uploadMint, publish } from '../../dropsActions'
import { clearState, dropSelector } from '../../dropSlice'

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

    const formatDate = (datePassed) => {

        const date = new Date(datePassed)

        return date.toLocaleString("en-US", {
            timeZone: "UTC",
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        })
    }

    const Flag = ({ text, status }) => {
        return (
            <div className="flex items-center">
                <span className={`w-2 h-2  rounded-full mr-1 ${status ? 'bg-yellow-green' : 'bg-mustard-yellow'}`}></span>
                <span className={`text-xs ${status ? 'text-yellow-green' : 'text-mustard-yellow'}`}> {text}</span>
            </div>
        )

    }


    return (
        <div className=' w-full flex flex-row justify-center items-center my-6'>
            <div className="w-8/12" >
                <div className="pb-2">
                    <div className="relative flex mt-1 justify-between items-center">
                        <h1 className='text-gray-800 text-3xl font-bold'>Drops</h1>

                        {user.user_type !== "minting_vendor" &&
                            <button onClick={() => navigate('/drops/create')}
                                className="py-1 px-4 border border-gray-300 text-white text-lg rounded-lg bg-gray-800">Add Drop</button>
                        }
                    </div>
                </div>

                {isFetching ? (
                    <div className='w-full'>
                        <div className='w-full'><h1>Loading...</h1></div>
                    </div>

                ) :
                    drops.length ? (
                        drops.map(drop => (
                            <div key={drop.id} className="shadow-md rounded my-5 cursor-pointer hover:bg-slate-50" onClick={() => { handleReview(drop.id) }}>
                                <div className="p-4 flex flex-row justify-between">
                                    <div className="flex flex-row gap-2 items-center">
                                        <img
                                            className="h-16 w-16 rounded"
                                            src={`${IMAGE_DIR}${drop?.image}`}
                                            alt="Drop Image" />
                                        <h4 className="text-base font-semibold">{drop.name}</h4>
                                    </div>
                                    <div className="flex flex-row gap-5 items-center">
                                        <div className="text-sonic-silver text-xs">Golive : {formatDate(drop?.go_live_date)}</div>
                                        <Flag text="Accessible" status={drop?.accessible} />
                                        <Flag text="Discoverable" status={drop?.discoverable} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                        : (<h1>No drops yet!</h1>)
                }

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
