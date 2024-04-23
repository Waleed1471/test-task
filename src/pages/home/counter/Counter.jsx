import React, { useState } from 'react'
import './Counter.css'
const Counter = () => {
    const [counter, setCounter] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    const restrictCounter = (value) => Math.min(Math.max(value, 0), 40);


    const incrementHandler = () => {
        setErrorMessage('');
        if (counter === 40) {
            setErrorMessage('Maximum value reached');
            return;
        }
        setCounter(prevCounter => restrictCounter(prevCounter + 1));
    };

    const decrementHandler = () => {
        setErrorMessage('');
        if (counter === 0) {
            setErrorMessage('Minimum value reached');
            return;
        }
        setCounter(prevCounter => restrictCounter(prevCounter - 1));
    };
  return (
    <div className='container text-center counter_wrap'>
        <h1>Counter App</h1>
        {errorMessage != '' && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <strong>{counter}</strong>
        <div className='d-flex flex-wrap align-center justify-center gap-55'>
            <button className='counterBtn' onClick={decrementHandler}>-</button>
            <button className='counterBtn' onClick={incrementHandler}>+</button>
        </div>
    </div>
  )
}

export default Counter