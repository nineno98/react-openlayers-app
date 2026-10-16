import React from 'react'

const CalendarCard = ({id, name, coordinates, icon, image, description}) => {
  return (
    <div className='CalendarCard-body'>
        <h3>{id}</h3>
    </div>
  )
}

export default CalendarCard