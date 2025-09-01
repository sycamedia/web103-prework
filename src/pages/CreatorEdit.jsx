import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { supabase } from '../client.js';

function CreatorEdit({refresh}) {
    let selectedID = useParams().id
    console.log(selectedID)
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [creatorData, setCreatorData] = useState({
        name: '',
        url: '',
        description: '',
        imageURL: ''
    });

    useEffect(() => {
        async function fetchCreatorData() {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .eq('id', selectedID);

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(data);
                setCreatorData(data[0]); 
            }
        }
        fetchCreatorData();
    }, []);

    if (!data) {
        return ("Loading...");
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission
        const { error } = await supabase  
            .from('creators')
            .update(creatorData)  
            .eq('id', selectedID);

        if (error) {
            console.error('Error updating data:', error);
        } else {
            console.log('Successfully updated creator')
            refresh()
        }

        goBack()
    }

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(previous);
        }
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setCreatorData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>Creator name</label>
                <input type='text' id='name' name='name' value={creatorData.name} onChange={handleChange} />
                <label htmlFor='url'>Social URL</label>
                <input type='text' id='url' name='url' value={creatorData.url} onChange={handleChange} />
                <label htmlFor='description'>Description</label>
                <textarea id='description' name='description' value={creatorData.description} onChange={handleChange} rows='4'></textarea>
                <label htmlFor='imageURL'>Image URL</label>
                <input type='text' id='imageURL' name='imageURL' value={creatorData.imageURL} onChange={handleChange} />
                <label>Image</label>
                {creatorData.imageURL ? <img src={creatorData.imageURL}/> : "No image"}
                <div className='buttonContainer'>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={goBack}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreatorEdit;