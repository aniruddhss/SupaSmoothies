/*eslint-disable no-unused-vars*/
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')

  const handleDelete=(id)=>{
    setSmoothies(prevSmoothies =>{
      return prevSmoothies.filter(sm => sm.id !==id)
    })

  }

useEffect(() => {
  const fetchSmoothies = async () => {
    const { data, error } = await supabase
      .from('smoothies')
      .select('*')
      .order(orderBy,{ascending:false})
    if (error) {
      setFetchError(error)
      setSmoothies(null)
    } else {
      setSmoothies(data)
      setFetchError(null)
    }
  }

  fetchSmoothies()
}, [orderBy])


  return (
    <div className="page home">
      {fetchError && <p>{fetchError.message}</p>}
      {smoothies && (
        <div className="smoothies">
          <div className="order-by">
            <p>Order By: </p>
            <button 
              id='button1' 
              style={{ backgroundColor: orderBy === 'created_at' ? '#6d15df' : '' }}
              onClick={() => setOrderBy('created_at')}
            >
              Time Created
            </button>
            <button 
              id='button2' 
              style={{ backgroundColor: orderBy === 'title' ? '#6d15df' : '' }}
              onClick={() => setOrderBy('title')}
            >
              Title
            </button>
            <button 
              id='button3' 
              style={{ backgroundColor: orderBy === 'rating' ? '#6d15df' : '' }}
              onClick={() => setOrderBy('rating')}
            >
              Rating
            </button>
            
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard 
                key={smoothie.id} 
                smoothie={smoothie} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home