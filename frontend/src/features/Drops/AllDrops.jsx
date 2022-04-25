import React, { Fragment } from 'react'
import Header from '../../components/Header'
import DropsTable from './components/DropsTable'

const AllDrops = () => {
    return (
        <Fragment>
            <Header selected="Drops" />
            <DropsTable />
        </Fragment>
    )
}

export default AllDrops