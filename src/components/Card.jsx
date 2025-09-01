import React from 'react';
import { NavLink } from 'react-router-dom';

function Card({ creatorID, creatorName, creatorDescription, imageURL, socialURL }) {

    return (
        <div className='Card'>
            <div className='image-container'>
                {imageURL ? <img
                    src={imageURL}
                /> : "(No image available)"}
            </div>
            <div className='detail-container'>
                <h3>{creatorName}</h3>
                <p>{creatorDescription}</p>
                <div className='button-container'>
                    <NavLink to={`/single-view/${creatorID}`}><button>Info</button></NavLink>
                    <NavLink to={`/edit/${creatorID}`}><button>Edit</button></NavLink>
                </div>
            </div>
        </div>
    )
}

export default Card