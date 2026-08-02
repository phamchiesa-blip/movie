import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import {assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-center gap-4 
    px-6 md:px-16 lg:px-36 bg-[url('./assets/backgroundImage.png')] bg-cover bg-center h-screen">
        <img src={assets.marvelLogo} alt="Hero" className="max-h-11 lg:h-11 mt-20" />

        <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-110">
          Guardians <br /> of the Galaxy
        </h1>

        <div className="flex items-center gap-4 text-gray-300">
            <span>Action | Sci-Fi | Adventure</span>
            <div className="flex items-center gap-1">
                <CalendarIcon className="w-4.5 h-4.5" /> {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-1">
                <ClockIcon className="w-4.5 h-4.5" /> 10h 37m
            </div>
        </div>

        <p className="max-w-md text-gray-300">
            In a post-apocalyptic world, a group of unlikely heroes must band together to save the galaxy from an ancient evil that threatens to destroy everything they hold dear.
        </p>
        <button onClick={() => navigate('/movies')} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull transition rounded-full font-medium">
            Explore Movies
            <ArrowRight className="w-5 h-5" />
        </button>
    </div>
  )
}

export default HeroSection