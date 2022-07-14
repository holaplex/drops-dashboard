import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUpload = ({ onDropFile }) => {

    const onDrop = useCallback(files => {
        onDropFile(files)
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="mb-3" {...getRootProps()} >
            <input className="hidden" type="file" placeholder="" {...getInputProps()} />
            <h2 className="font-semibold">Upload NFT data</h2>
            <label className="flex justify-center w-full h-32 px-4 transition bg-[#eee] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex flex-col text-center items-center justify-center">
                    <span className="font-bold"> Drag and drop here </span>
                    <span className="text-sm"> .xls and CSV files supported </span>
                    <a className="underline text-sm mt-2"> Download .xls template </a>
                </span>
            </label>
            <div>
            </div>
        </div>
    )
}

export default FileUpload
