// useEffect function from Mistral Small 3 AI
import { useState, useEffect, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { supabase } from './client.js'
import './App.css'

// Routes
import CreatorAdd from './pages/CreatorAdd.jsx';
import CreatorEdit from './pages/CreatorEdit.jsx';
import CreatorViewAll from './pages/CreatorViewAll.jsx';
import CreatorViewSingle from './pages/CreatorViewSingle.jsx';

function App() {
  const [data, setData] = useState([])

  const fetchData = useCallback(async () => {
    const { data, error } = await supabase
      .from('creators')
      .select();

    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setData(data);
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div>
      <header>
        <h1>Creatorverse</h1>
      </header>

      <Routes>
        <Route path="/" element={<CreatorViewAll data={data} />} />
        <Route path="/single-view/:id" element={<CreatorViewSingle refresh={fetchData}/>} />
        <Route path="/add" element={<CreatorAdd refresh={fetchData}/>} />
        <Route path="/edit/:id" element={<CreatorEdit refresh={fetchData}/>} />
      </Routes>
    </div>
  )
}

export default App
