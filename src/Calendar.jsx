import React from 'react'

const Calendar = ({data, onClose}) => {
    const isOpen = Boolean(data);
    return (
        <div className={`overlay ${data ? 'open' : ''}`} onClick={onClose}>
            <div className='calendar-card'>
                <div className='calendar-head'>
                    <div className='calendar-dots-container'>
                        <div className='calendar-dots'></div>
                        <div className='calendar-dots'></div>
                    </div>
                    SZEPTEMBER</div>
                <div className='calendar-body'>
                    12
                </div>
            </div>


        </div>
    )
}

export default Calendar