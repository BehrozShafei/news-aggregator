import React from 'react'
import { Outlet } from 'react-router'
import Header from '../component/Header'
const MyFeedLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default MyFeedLayout