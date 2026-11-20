import React from 'react'

const CalendarCard = ({id, name, coordinates, icon, image, description, onClick}) => {
  return (
    <div className='CalendarCard-body' onClick={() => onClick(coordinates)}>
        <h3>{id}</h3>
    </div>
  )
}

export default CalendarCard