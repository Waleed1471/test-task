import React from 'react'
import './CounterButton.css'
const CounterButton = ({properties}) => {
    const { handler, type } = properties;
  return (
    <button className='counterBtn' onClick={handler}>{type}</button>
  )
}

export default CounterButton