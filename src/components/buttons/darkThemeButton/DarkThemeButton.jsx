import React from 'react'
import './DarkThemeButton.css'
const DarkThemeButton = ({properties}) => {
    const { handler, title } = properties;
  return (
    <button className='darkBtn' onClick={handler}>{title}</button>
  )
}

export default DarkThemeButton