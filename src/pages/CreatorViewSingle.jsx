import React from 'react';
import { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client.js'


function CreatorViewSingle({refresh}) {
    let selectedID = useParams().id
    let navigate = useNavigate()
    console.log(selectedID)

    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchCreatorData() {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', selectedID);
            console.log('What CreatorViewSingle.jsx gets from supabase:', data)
            console.log('App.jsx error:', error)

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                console.log('Fetched data:', data); // Add this line to log the fetched data
                setData(data);
            }
        }
        fetchCreatorData();
    }, []);

    if (!data) {
        return ("Loading...")
    }

    let cardData = data[0]

    function handleDelete() {
        const deleteButton = document.getElementById('delete')
        deleteButton.innerText = "Confirm delete"
        deleteButton.addEventListener('click', confirmDelete)
    }

    async function confirmDelete() {
        console.log("Deleting creator with ID:", selectedID);
        const {data, error} = await supabase
            .from('creators')
            .delete()
            .eq('id', selectedID);
        if (error) {
            console.error('Error deleting data:', error);
        } else {
            console.log("Successfully deleted data")
            refresh()
            navigate('/')
        }
    }

    return (
        <div>
            {cardData.imageURL ? <img
                src={cardData.imageURL}
            /> : "No image available"}
            <h3>{cardData.name}</h3>
            <p>{cardData.description}</p>
            <a href={cardData.url}><button>Visit {cardData.name}'s page</button></a>
            <NavLink to={`/edit/${selectedID}`}><button>Edit</button></NavLink>
            <button id='delete' onClick={handleDelete}>Delete</button>
            <NavLink to="/"><button>Back</button></NavLink>
        </div>
    )
}

export default CreatorViewSingle