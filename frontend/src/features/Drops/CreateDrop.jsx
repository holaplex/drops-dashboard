import React, { Fragment } from 'react'
import Header from '../../components/Header'

export const CreateDrop = () => {
    return (
        <div className='w-screen h-screen overflow-y-hidden'>
            <Header selected="Drops" />
            <div className='flex w-full h-full justify-center items-center'>
                <div className="w-8/12">
                    <span class="flex shadow-md mb-5 text-xs">
                        <span class="bg-gray-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Drop Name</span><input class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full" type="text" placeholder="MyAmazingDrop" />
                    </span>
                    <span class="flex shadow-md mb-5 text-xs">
                        <span class="bg-gray-800 w-28 font-bold text-center text-gray-200 p-3 px-5 rounded-l">Upload XLS</span><input class="field text-sm text-gray-600 p-2 px-3 rounded-r w-full" type="file" placeholder="" />
                    </span>
                    <button className='bg-gray-800 font-bold text-gray-200 p-3 w-8/12 rounded-md hover:bg-gray-700'>
                        Create Drop
                    </button>
                </div>
            </div>
        </div>
    )
}
