import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Favourite from './pages/Favourite'
import MyBooking from './pages/MyBooking'
import SeatLayout from './pages/SeatLayout'
import MovieDetail from './pages/MovieDetail'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
   <>
   <Toaster />
   {!isAdminRoute && <Navbar />}
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/movies' element={<Movie />} />
    <Route path='/favourite' element={<Favourite />} />
    <Route path='/my-bookings' element={<MyBooking />} />
    <Route path='/movies/:id' element={<MovieDetail />} />
    <Route path='/movies/:id/:date' element={<SeatLayout />} />
   </Routes>
   {!isAdminRoute && <Footer />}
   </>
  )
}

export default App