import React, { useState } from 'react'
import { useReward } from 'partycles';
import { useRef } from 'react';

const Calendar = ({data, onClose}) => {
    const isOpen = Boolean(data);

    const closeDivRef = useRef(null);
  
    const { reward } = useReward(closeDivRef, 'hearts', {
        particleCount: 100,
        spread: 100,
        elementSize: 25,
    });
    const handleClose = () => {
        reward();
        setTimeout(() => {
            onClose();
        }, 20);
    }
    
    
    return (
        <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={handleClose}>
            <div className='calendar-wrapper'>
                    <div className='calendar-card' ref={closeDivRef}>
                    <div className='calendar-head'>
                        <div className='calendar-dots-container'>
                            <div className='calendar-dots'></div>
                            <div className='calendar-dots'></div>
                        </div>
                        
                        {data && data.month}
                        
                    </div>
                    <div className='calendar-body'>
                        
                        {data && data.day}
                        
                    </div>
                </div>

            </div>
            

        </div>
    )
}

export default Calendar