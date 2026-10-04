import React, { useState } from 'react'

const Calendar = ({data, onClose}) => {
    const isOpen = Boolean(data);
    const [isFlipped, setisFlipped] = useState(false);
    function handleFlipp () {
        setTimeout(() => {
            setisFlipped(!isFlipped);
        }, 4000)
        
    }
    handleFlipp();
    return (
        <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className='calendar-wrapper'>
                    <div className='calendar-card'>
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