import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const FileUpload = ({ onDropFile, file }) => {

    const onDrop = useCallback(files => {
        if (files && files.length > 0) {
            onDropFile(files[0])
        }
    }, [file]);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-excel': ['.xls'],
            'text/csv': ['.csv']
        },
    });


    return (
        <div>
            <h2 className="font-semibold">Upload NFT data</h2>

            <div className="mb-3" {...getRootProps()} >
                <input className="hidden" type="file" placeholder="" {...getInputProps()}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    multiple={false}
                />
                <label className="flex justify-center w-full h-32 px-4 transition bg-[#eee] border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none" >
                    <span className="flex flex-col text-center items-center justify-center">
                        {acceptedFiles && acceptedFiles.length > 0 ? (
                            <span>Selected File : {acceptedFiles[0].name}</span>
                        ) : (
                            <>
                                <span className="font-bold"> Drag and drop here </span>
                                <span className="text-sm"> .xls and CSV files supported </span>
                            </>
                        )}
                    </span>
                </label>
            </div>
        </div>
    )
}

export default FileUpload
