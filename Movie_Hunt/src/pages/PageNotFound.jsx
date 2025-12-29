import React from 'react'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
    const navi = useNavigate();
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <h1 className='text-danger'>404 Page Not Found !!!!</h1>
            <div className='mt-3'>
                <a className='btn btn-danger btn-sm text-white' href="/">GO TO HOME</a>
            </div>
        </div>
    )
}

