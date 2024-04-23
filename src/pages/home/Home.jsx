import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { BackButton } from '../../component/buttons/backButton/BackButton';
import './Home.css'
import TaskCard from '../../component/taskCard/TaskCard';

export const Home = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const taskCards = [
        {
            url: "/counter",
            title: "Counter Task",
        },
        {
            url: "/reverse-string",
            title: "Reverse String Task",
        },
        {
            url: "/weather",
            title: "Weather API",
        }
    ]

    return (
        <>
            {
                location.pathname !== '/' ? (
                    <>
                        <div className='container text-right'>
                            <BackButton goBackHandler={() => navigate("/")} />
                        </div>
                        <Outlet />
                    </>
                ) : (
                    <div className='container'>
                        <h1>DependiBot Test Task</h1>
                        <div className='d-flex flex-wrap gap-55 justify-start align-center py-40'>
                            {
                                taskCards.map((card,index) => {
                                    return(
                                        <TaskCard key={index}
                                            properties={{
                                                url: card.url,
                                                title: card.title,
                                            }}
                                        />
                                    )
                                 })
                            }
                            
                        </div>
                    </div>
                )
            }


        </>
    )
}
