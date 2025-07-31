import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {

  useGSAP(()=>{
    gsap.from("#logo",{
      x:550,
      duration:2,
      ease:"power1.inOut"
    })
    gsap.from(".ftext",{
      opacity:0,
      delay:0.6
    })
     gsap.from(".htext",{
      opacity:0,
      delay:1.8
    })
  })

  return (
    <nav className="w-full fixed text-white flex justify-center p-4 sm:p-6 md:p-8 z-50" >
        <div className="w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw]  overflow-hidden flex justify-between px-4 sm:px-6 md:px-8 py-2 rounded-full bg-[#c2aaf2] ">
            <div className="flex justify-center items-center gap-1">
                <img id='logo' title='logo' src="/Images/GhostLogo.png" className="object-cover h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-5" />
                <Link to="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-sm htext sm:text-base md:text-lg font-medium">Ghost Room</h1>
                </Link>
            </div>
            <div className="flex justify-between gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base">
                <Link to="/about" className="hover:opacity-80 transition-opacity">
                  <h1 className='ftext'>About</h1>
                </Link>
                <h1 className='ftext' >Code</h1>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar 