import './styles/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Lesson1 from './pages/Lesson1'
import Lesson2 from './pages/Lesson2'
import Lesson3 from './pages/Lesson3'
import Lesson4 from './pages/Lesson4'
import Lesson5 from './pages/Lesson5'
import Lesson6 from './pages/Lesson6'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='app'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/lesson1' element={<Lesson1 />} />
        <Route path='/lesson2' element={<Lesson2 />} />
        <Route path='/lesson3' element={<Lesson3 />} />
        <Route path='/lesson4' element={<Lesson4 />} />
        <Route path='/lesson5' element={<Lesson5 />} />
        <Route path='/lesson6' element={<Lesson6 />} />
      </Routes>
    </div>
  )
}

export default App
