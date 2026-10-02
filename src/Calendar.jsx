import React from 'react'

const Calendar = ({data, onClose}) => {
    const isOpen = Boolean(data);
    return (
        <div className={`overlay ${data ? 'open' : ''}`} onClick={onClose}>
            <div>Calendar</div>


        </div>
    )
}

export default Calendar