import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { createDrop } from './dropsActions'
import { dropSelector } from './dropSlice'
import Header from '../../components/Header'

export const CreateDrop = () => {
    const [file, setFile] = useState()
    const [name, setName] = useState('')

    const { isFetching, isSuccess, isError } = useSelector(dropSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isFetching) {
            console.log("FETCHING!")
        }
        if (isSuccess) {
            navigate('/drops/summary')
        }
        if (isError) {
            console.log("ERROR")
        }
    }, [isFetching, isSuccess, isError])

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("name", name)
        dispatch(createDrop(formData))
    }

    return (
        <div className='w-screen h-screen overflow-y-hidden'>
            <Header selected="Drops" />
            <div className='flex w-full h-full justify-center items-center'>
                <div className="w-8/12">
                    <span className="flex shadow-md mb-5 text-xs">
                        <span className="bg-gray-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">
                            Drop Name
                        </span>
                        <input value={name} onChange={v => setName(v.target.value)} className="field text-sm text-gray-600 p-2 px-3 rounded-r w-full" type="text" placeholder="Drop Name (internal name only)" />
                    </span>
                    <span className="flex shadow-md mb-5 text-xs">
                        <span className="bg-gray-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">
                            Upload XLS
                        </span>
                        <input onChange={f => setFile(f.target.files[0])} className="field text-sm text-gray-600 p-2 px-3 rounded-r w-full" type="file" placeholder="" />
                    </span>
                    {isFetching ? (
                        <button disabled className='bg-gray-800 disabled font-bold text-gray-200 p-3 w-8/12 rounded-md cursor-wait opacity-75'>
                            Uploading...
                    </button>
                    ) : (
                            <button onClick={handleUpload} className='bg-gray-800 font-bold text-gray-200 p-3 w-8/12 rounded-md hover:bg-gray-700'>
                                Create Drop
                    </button>
                        )}

                </div>
            </div>
        </div>
    )
}
