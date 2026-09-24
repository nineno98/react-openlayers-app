import React from 'react'

const Popup = ({data, onClose}) => {
    if(!data) return null;

    return (
        <div className='popup-background'>
            <div>
                <p>Popup main</p>
            </div>
            <div>
                <button type="button" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    );
}

export default Popup