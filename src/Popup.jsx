import React from 'react'
import {CSSTransition} from 'react-transition-group'
import { useState, useRef } from 'react';

const Popup = ({data, onClose}) => {
    //if(!data) return null;
   // const nodeRef = useRef(null);
    const isOpen = Boolean(data);

    return (
        
        <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className='popup-card' onClick={(e) => e.stopPropagation()}>
                <p>Popup main</p>
                <button type="button" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
        
        
        
    );
}

export default Popup