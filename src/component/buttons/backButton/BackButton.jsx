import React from 'react'
import './BackButton.css'
export const BackButton = ({goBackHandler}) => {
    return (
        <>
            <button className='themeButton' onClick={goBackHandler}>
                Go Back
            </button>
        </>
    )
}
