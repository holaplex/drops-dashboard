import React, { Fragment } from 'react'
import Header from '../../components/Header'
import UsersTable from './components/UsersTable'

const AllUsers = () => {
    return (
        <Fragment>
            <Header selected="Users" />
            <UsersTable />
        </Fragment>
    )
}

export default AllUsers