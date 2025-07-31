import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Hero: React.FC = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/page1')
  }
  

  useGSAP(()=>{
    gsap.from("#heading",{
      y:200,
      duration:0.7,
      ease:"power1.inOut"
    })
    gsap.from(".subheading",{
      delay:0.7,
      y:200,
      duration:0.7,
      ease:"power1.inOut"
    })
  })

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center px-4 sm:px-8 md:px-16">
          {/* Left side - Logo */}
          <div className="flex justify-center items-center lg:justify-start">
            <div className="w-[60%] sm:w-[70%] md:w-[80%] h-full bg-[url('/Images/BehindLogo.png')] p-8 sm:p-12 md:p-16 bg-contain">
              <img title='logo' src="/Images/GhostLogo.png" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center relative lg:text-left flex justify-center items-center flex-col space-y-6 sm:space-y-8">
            <div>
              <div className="text-4xl overflow-hidden sm:text-5xl md:text-6xl lg:text-7xl h-30 w-full text-center text-gray-900">
                <h1 id='heading' >Ghost Room</h1>
              </div>
              <div className='overflow-hidden' >
              <h2 className="text-lg subheading sm:text-xl md:text-2xl lg:text-3xl w-full text-center mt-4 sm:mt-6 md:mt-8 text-gray-800">
                Instant Private Chat. No Signups. No History.
              </h2>
              </div>
              <div className="w-full flex justify-center overflow-hidden mt-2 items-center">
                <p className="text-base subheading sm:text-lg md:text-xl text-[#545454] w-full sm:w-4/5 text-center mx-auto lg:mx-0 px-4 sm:px-0">
                  Create a temporary room, share the code, start chatting — poof! It's gone when you're done.
                </p>
              </div>
              <img title='arrow' src="/Images/Arrow.png" className="hidden lg:block w-40 h-32 object-cover absolute bottom-[-5rem] left-[-0.5rem] sm:left-[-0.75rem] md:left-[-1rem]" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
              <div
                onClick={handleGetStarted}
                className="bg-[#572c73] hover:bg-purple-700 text-white px-7 sm:px-8 py-2 rounded-lg text-base sm:text-lg font-medium cursor-pointer transition-colors"
              >
                Get Started
              </div>
              <Link to="/about"
                
                className="bg-white text-[#572c73] border border-[#d0c9ea] px-12 sm:px-12 py-2 rounded-lg text-base sm:text-lg font-medium"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero 