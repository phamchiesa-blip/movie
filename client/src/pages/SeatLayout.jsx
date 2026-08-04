import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import {dummyDateTimeData, dummyShowsData, cinemaName } from '../assets/assets'
import Loading from '../components/Loading'
import {ArrowRightIcon, ClockIcon} from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import { assets } from "../assets/assets";
import toast from 'react-hot-toast'

const SeatLayout = () => {

  const groupRows =  [
    ["A", "B"], 
    ["C", "D"],
    ["E", "F"],
    ["G", "H"],
    ["I", "J"]                 
];

  const {id, date} = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState();
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async() => {
    const show = dummyShowsData.find(show => show._id === id);
    if(show) {
      setShow({
        movie: show,
        dateTime: dummyDateTimeData
      })
    }
  }

 

  const handleSeatClick = (seatId) => {
    if(!selectedTime) {
      return toast('Please select time first');
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
       return toast('You can only select 5 seats');
    }
    setSelectedSeats(prev => prev.includes(seatId) ?
    prev.filter(seat => seat !== seatId) : 
    [...prev, seatId]);
  }

  const renderSeats = (row, count=9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({length: count}, (_, i) => {
          const seatId = `${row}${i+1}`;
          return (
            <button key={seatId} onClick={() => handleSeatClick(seatId)} 
            className={`h-8 w-8 rounded border border-primary/60
                cursor-pointer ${selectedSeats.includes(seatId) && 
                  "bg-primary text-white"}`}>
                    {seatId}
            </button>
          );
        })}
      </div>
    </div>
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getShow();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return show ? (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50">
      {/* Available Timings */}
      <div className="w-60 bg-primary/10 border border-primary/70 rounded-lg py-10 h-max md:sticky md:top-30">
        <p className="text-lg font-semibold px-6">Available Timings</p>
        <div className="mt-5 space-y-1">
          {show.dateTime[date].map((item, index) => (
            <div key={index} onClick={() => setSelectedTime(item)} className={`flex items-center gap-2 px-6 py-2
             w-max rounded-r-md cursor-pointer transiton
             ${selectedTime?.time === item.time ? 
              "bg-primary text-white" 
             : "hover:bg-primary/20"}`}>
              <ClockIcon className="w-4 h-4" />
              <p className="text-sm">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seats Layout */}
      <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
          <BlurCircle top="-100px" left="-100px"/>
          <BlurCircle bottom="-0px" right="0px"/>
          <h1 className="text-4xl font-semibold mb-5">Select your seat</h1>
          <img src={assets.screenImage} alt="" />
          <p className="text-gray-400 text-sm mb-6">SCREEN SIDE</p>

          <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
              {groupRows[0].map(row => renderSeats(row))}
            </div>

            <div className="grid grid-cols-2 gap-11">
            {groupRows.slice(1).map((group, i) => (
              <div key={i} className="">
                {group.map(row => renderSeats(row))}
              </div>
            ))}
          </div>
          </div>

          {/* Name of cinema */}
           <h1 className="text-4xl font-semibold mb-5 mt-20">Cinema here!</h1>
          <div className="flex flex-wrap gap-5 px-5 py-2 justify-center">
            {cinemaName.map((name)  => (
              <div key={name.id}
              onClick={() => {
                setSelectedCinema(name.id);
              }}
              className={`flex flex-col items-center w-[300px]
               border border-gray/70 bg-white/10 rounded-lg py-4 active:scale-95 cursor-pointer transition
                ${selectedCinema === name.id ? "text-primary" : "text-white"}
            `}>
                <h1 className="text-xl font-semibold">{name.name}</h1>
                <h1 className="text-sm font-medium text-gray-400">{name.address}</h1>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/my-bookings')}
           className="flex items-center gap-1 mt-20 py-3 px-10 text-sm
          bg-primary hover:bg-primary-dull transition rounded-full font-medium
          cursor-pointer active:scale-95">
            Proceed to checkout
            <ArrowRightIcon strokeWidth={3} className="w-4 h-4" />
          </button>
      </div>
    </div>
  ) : (
    <Loading />
    
  )

}

export default SeatLayout

