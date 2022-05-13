import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import Header from '../../components/Header'

export const CreateDrop = () => {
    const [file, setFile] = useState()
    const navigate = useNavigate();

    const handleUpload = async () => {
        const formData = new FormData()
        formData.append("file", file)
        const res = await axios.post('http://localhost:3000/api/v1/upload/excel', formData)
        console.log("UPLOADING")
        console.log(res)
        if (res.sucess === true) {
            navigate('/drops/summary')
        }
    }

    useEffect(() => { console.log(file) }, [file])

    return (
        <div className='w-screen h-screen overflow-y-hidden'>
            <Header selected="Drops" />
            <div className='flex w-full h-full justify-center items-center'>
                <div className="w-8/12">
                    <span className="flex shadow-md mb-5 text-xs">
                        <span className="bg-gray-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Drop Name</span><input className="field text-sm text-gray-600 p-2 px-3 rounded-r w-full" type="text" placeholder="MyAmazingDrop" />
                    </span>
                    <span class="flex shadow-md mb-5 text-xs">
                        <span class="bg-gray-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Upload XLS</span><input onChange={f => setFile(f.target.files[0])} class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full" type="file" placeholder="" />
                    </span>
                    <button onClick={handleUpload} className='bg-gray-800 font-bold text-gray-200 p-3 w-8/12 rounded-md hover:bg-gray-700'>
                        Create Drop
                    </button>
                </div>
            </div>
        </div>
    )
}
