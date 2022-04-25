import React, { Fragment } from 'react'
import Header from '../../components/Header'
import DropsTable from './components/DropsTable'

const Users = () => {
    return (
        <Fragment>
            <Header selected="Drops" />
            <DropsTable />
        </Fragment>
    )
}

export default Users