import React from 'react';
import Card from '../components/Card.jsx'
import {NavLink} from 'react-router-dom'

function CreatorViewAll({ data }) {
    console.log("What CreatorViewAll receives:", data);
  
    if (!data) {
      return <div>Loading...</div>
    }
  
    return (
      <div className='CardGrid'>
        {data.map((creator) => (
          <Card
            key={creator.id}
            creatorID={creator.id}
            creatorName={creator.name}
            creatorDescription={creator.description}
            imageURL={creator.imageURL}
            imageAlt={`Profile picture of ${creator.name}`}
            socialURL={creator.url}
          />
        ))}
        <NavLink to='/add'><button id='add-button'>Add creator</button></NavLink>
      </div>
    );
  }

export default CreatorViewAll