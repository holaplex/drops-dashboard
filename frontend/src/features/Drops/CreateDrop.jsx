import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai'
import { createDrop } from './dropsActions'
import { dropSelector, clearState } from './dropSlice'
import Header from '../../components/Header'
import FileUpload from '../Drops/components/FileUpload'
import { DOWNLOAD_DIR } from '../../helpers/requestHelper';

export const CreateDrop = () => {
	const [file, setFile] = useState()

	const { isFetching, isSuccess, isError } = useSelector(dropSelector);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onDrop = (selectedFile) => {
		if (!file || selectedFile.path !== file.path) {
			setFile(selectedFile)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			navigate('/drops/summary')
		}
		dispatch(clearState())
	}, [isSuccess, file])

	const handleUpload = async () => {
		const formData = new FormData()
		formData.append("file", file)
		formData.append("name", "")
		dispatch(createDrop(formData))
	}

	const handleCross = () => {
		setFile(null);
		navigate('/drops');
	}

	return (
		<div className='w-screen h-screen overflow-y-hidden'>
			<Header selected="Drops" />
			<div className='flex w-full h-full justify-center items-center'>
				<div className="w-11/12 md:w-8/12">
					<div className="flex flex-row justify-between items-center">
						<h1 className="text-3xl font-semibold mb-5">Create new drop</h1>
						<span className="cursor-pointer" onClick={handleCross}>
							<AiOutlineClose size={24} className='text-dropGray mr-2 cursor-pointer' />
						</span>
					</div>
					<FileUpload onDropFile={onDrop} file={file} />
					<div className="flex flex-row justify-between">
						<a href={`${DOWNLOAD_DIR}drop_sample.xlsx`} className="underline text-sm mt-2 cursor-pointer" download> Download .xls template </a>
						{isError && <span className="text-red-500">Error uploading the file!</span>}

						{isFetching ? (
							<button disabled className='bg-gray-800 disabled font-bold text-gray-200 p-3  rounded-md cursor-wait opacity-75  px-8'>
								Uploading...
							</button>
						) : (
							<button onClick={handleUpload} className='px-8 bg-gray-800 font-bold text-gray-200 p-3 rounded-md hover:bg-gray-700 
                        disabled:opacity-18 disabled:cursor-not-allowed' disabled={!file} >
								Next
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
