import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { createDrop } from './dropsActions'
import { dropSelector } from './dropSlice'
import Header from '../../components/Header'
import FileUpload from '../Drops/components/FileUpload'

export const CreateDrop = () => {
    const [file, setFile] = useState()

    const { isFetching, isSuccess, isError } = useSelector(dropSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onDrop = (files) => {
        setFile(files[0])
    }


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
        dispatch(createDrop(formData))
    }

    const handleCross = () => {
        setFile();
        navigate('/drops');
    }

    return (
        <div className='w-screen h-screen overflow-y-hidden'>
            <Header selected="Drops" />
            <div className='flex w-full h-full justify-center items-center'>
                <div className="w-8/12">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-3xl font-semibold mb-5">Create new drop</h1>
                        <span className="cursor-pointer" onClick={handleCross}>X</span>
                    </div>
                    <FileUpload onDropFile={onDrop} />
                    {isFetching ? (
                        <button disabled className='bg-gray-800 disabled font-bold text-gray-200 p-3  rounded-md cursor-wait opacity-75 float-right px-8'>
                            Uploading...
                        </button>
                    ) : (
                        <button onClick={handleUpload} className='px-8 bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700 float-right
                        disabled:opacity-18 disabled:cursor-not-allowed'
                            disabled={!file}
                        >
                            Next
                        </button>
                    )}

                </div>
            </div>
        </div>
    )
}
