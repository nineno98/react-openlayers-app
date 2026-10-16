import React from 'react'
import CalendarCard from './CalendarCard'


const CalendarCards = ({data}) => {
  return (
    <div className='calendarCards-container'>
        {data.map(card => (
            <CalendarCard key={card.id} {...card}/>
        ))}
    </div>
  )
}

export default CalendarCards