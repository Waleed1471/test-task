import React, { useState } from 'react'
import DarkThemeButton from '../../../components/buttons/darkThemeButton/DarkThemeButton';
import './ReverseString.css'
const ReverseString = () => {
    const [inputString, setInputString] = useState('');
    const [reversedString, setReversedString] = useState('');
   
    const reverseStringHandler = () => {
        let reversedStr = '';
        for (let i = inputString.length - 1; i >= 0; i--) {
            reversedStr += inputString[i];
        }
        setReversedString(reversedStr);
    };
    
    const handleInputChange = (event) => {
        setInputString(event.target.value);
        // Clear reversed string when input is empty
        if (event.target.value === '') {
          setReversedString('');
        }
      };
    return (
        <div className='container text-center'>
            <h1>Reverse a String</h1>
            <div className='d-flex gap-5 align-center justify-center'>
                <textarea
                    type="text"
                    value={inputString}
                    onChange={handleInputChange}
                    placeholder="Enter a string"
                    className='defaultInput'
                    rows="1"
                ></textarea>
                <DarkThemeButton properties={{
                    handler: reverseStringHandler,
                    title: "Reverse",
                }} />
            </div>
            {
                reversedString !== "" && (

                    <div className='reverseStringCard'>
                        <p>Reversed String:</p>
                        <span>{reversedString}</span>
                    </div>
                )
            }
        </div>
    )
}

export default ReverseString