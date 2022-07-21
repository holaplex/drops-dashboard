import React from 'react'
import Header from '../../components/Header'
import DropsTable from './components/DropsTable'

const AllDrops = () => {
    return (
        <>
            <Header selected="Drops" />
            <DropsTable />
        </>
    )
}

export default AllDrops
