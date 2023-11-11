import React from 'react'
import "../styles/home.css"

import { useNavigate } from 'react-router-dom';


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className='home'>

      <div className='button' onClick={() => navigate("/lesson1")}>
        <div>Lesson 1</div>
        <div>Free Choice Questions</div>
      </div>

      <div className='button' onClick={() => navigate("/lesson2")}>
        <div>Lesson 2</div>
        <div>Fill in the Blank Questions</div>
      </div>

      <div className='button' onClick={() => navigate("/lesson3")}>
        <div>Lesson 3</div>
        <div>Matrix Sorting Questions</div>
      </div>

      <div className='button' onClick={() => navigate("/lesson4")}>
        <div>Lesson 4</div>
        <div>Sorting Questions</div>
      </div>

      <div className='button' onClick={() => navigate("/lesson5")}>
        <div>Lesson 5</div>
        <div>Single choice Questions</div>
      </div>

      <div className='button' onClick={() => navigate("/lesson6")}>
        <div>Lesson 6</div>
        <div>Multiple Choice Questions</div>
      </div>


    </div>
  )
}

export default Home