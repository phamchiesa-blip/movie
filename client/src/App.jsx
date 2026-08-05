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
import Layout from './pages/admin/Layout'
import DashBoard from './pages/admin/DashBoard'
import AddShow from './pages/admin/AddShow'
import ListShow from './pages/admin/ListShow'
import ListBooking from './pages/admin/ListBooking'

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
   {/* /admin/*: page nào có url chứa .admin thì đều có UI của Layout */}
    <Route path='/admin/*' element={<Layout />}> 
      <Route index element={<DashBoard />}/>
      <Route path='add-shows' element={<AddShow />}/>
      <Route path='list-shows' element={<ListShow />}/>
      <Route path='list-bookings' element={<ListBooking />}/>
    </Route>
   </Routes>
   {!isAdminRoute && <Footer />}
   </>
  )
}

export default App