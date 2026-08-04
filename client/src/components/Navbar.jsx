import {Link} from 'react-router-dom'
import {assets} from '../assets/assets'
import {MenuIcon, SearchIcon, XIcon} from 'lucide-react'
import {useState} from 'react'
import { useUser, useClerk, UserButton } from '@clerk/react';
import { TicketPlus } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = useUser();
  const {openSignIn} = useClerk();

  const navigate = useNavigate();

  return (
   <div className='fixed top-0 left-0 w-full z-50 w-full flex items-center
   justify-between px-6 py-5 md:px-16 lg:px-36'>
    <Link to='/' className='max-md:flex-1'>
    <img src={assets.logo} className='h-auto w-36' />
    </Link>

    <div className={`max-md:absolute max-md:top-0 max-md:left-0
     max-md:font-medium max-md:text-lg z-50 flex flex-col 
     md:flex-row items-center max-md:justify-center gap-8 
     min-md:px-8 py-3 max-md:h-screen min-md:rounded-full 
     backdrop-blur bg-black/70 md:bg-white/10 md:border
    border-gray-300/20 overflow-hidden transition-[width] duration-300
     ${isMenuOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>
      <XIcon onClick={() => setIsMenuOpen(!isMenuOpen)} 
      className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer'/>
      <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false);}} to='/' className=''>Home</Link>
      <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false);}} to='/movies' className=''>Movies</Link>
      <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false);}} to='/theaters' className=''>Theaters</Link>
      <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false);}} to='/releases' className=''>Releases</Link>
      <Link onClick={() => {scrollTo(0, 0); setIsMenuOpen(false);}} to='/favourite' className=''>Favorites</Link>
    </div>

    <div className='flex items-center gap-8'>
      <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
      {
        !user ? (
          <button onClick={openSignIn} className='px-4 py-1 sm:px-7 sm:py-2 bg-primary
        hover:bg-primary-dull transition rounded-full font-medium
          cursor-pointer'>LogIn</button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus size={15} />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )
      }
    </div>

    <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' />
   </div>
  )
}

export default Navbar