import React from 'react'
import {CSSTransition} from 'react-transition-group'
import { useState, useRef } from 'react';

const Popup = ({data, onClose}) => {
    const isOpen = Boolean(data);

    return (
        
        <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className='popup-card' onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose}>
                    X
                </button>
                {data && <h3>{data.name}</h3>}
                
            </div>
        </div>
        
        
        
    );
}

export default Popup