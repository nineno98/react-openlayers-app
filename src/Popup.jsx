import React from 'react'
import {CSSTransition} from 'react-transition-group'
import { useState, useRef } from 'react';

const Popup = ({data, onClose}) => {
    const isOpen = Boolean(data);
    

    return (
        
        <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <div className='popup-card' onClick={(e) => e.stopPropagation()}>
                <div>
                    <button type="button" onClick={onClose}>
                        ✖
                    </button>
                    <div className='title-container'>
                        {data && <h1>{data.name}</h1>}
                    </div>
                    
                    
                </div>
               
                
                {data && <img src={data.image}></img>}
                <div className='description-container'>
                        {data && <p>{data.description}</p>}
                </div>
                
                
            </div>
        </div>
        
        
        
    );
}

export default Popup