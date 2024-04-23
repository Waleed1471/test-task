import React from 'react'
import './TaskCard.css'
import { Link } from 'react-router-dom'
const TaskCard = ({ properties}) => {
    const { url, title } = properties;
  return (
    <div className='taskCardsCommon'>
        <Link to={url}>
            {title}
        </Link>
    </div>
  )
}

export default TaskCard