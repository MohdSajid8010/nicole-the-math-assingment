import React from 'react'
import "../styles/home.css"

import { useNavigate } from 'react-router-dom';


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className='home'>
      <button onClick={() => navigate("/lesson1")}>Lesson 1</button>
      <button onClick={() => navigate("/lesson2")}>Lesson 2</button>
      <button onClick={() => navigate("/lesson3")}>Lesson 3</button>
      <button onClick={() => navigate("/lesson4")}>Lesson 4</button>
      <button onClick={() => navigate("/lesson5")}>Lesson 5</button>
      <button onClick={() => navigate("/lesson6")}>Lesson 6</button>
    </div>
  )
}

export default Home