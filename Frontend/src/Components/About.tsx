import React from 'react'

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 bg-[url('/Images/HomeBg.png')] bg-cover bg-bottom ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mt-4 sm:mt-8 md:mt-12 mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-900 mb-4">What is Ghost Room?</h1>
          <p className="text-lg text-[#545454] max-w-4xl mx-auto leading-relaxed">
            GhostRoom is a lightweight, anonymous chat app built for fast, no-strings-attached conversations. We believe
            not every chat needs a login, profile pic, or permanent record. Sometimes, you just want to say something,
            share a thought, or laugh with a friend — and then vanish like a ghost. That's what GhostRoom is for.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-12 sm:gap-16 md:gap-8 max-w-5xl  mx-auto">
          {/* Real-Time Messaging Card */}
            <div className="relative bg-[#d0c9ea] border border-[#8c52ff] rounded-2xl px-6 pt-20 pb-10 text-center shadow-lg shadow-purple-300/50">
                {/* Floating Icon */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 bg-[url('/Images/Realtime.png')] bg-contain bg-no-repeat"></div>
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-semibold text-[#572c73] mb-4">Real-Time Messaging</h3>

                {/* Description */}
                <p className="text-[#655687] text-[16px] leading-relaxed">
                    Messages are delivered instantly as you type, creating a real-time chat experience that feels natural and effortless. Everyone in the room sees your message the moment you send it, keeping conversations smooth and engaging.
                </p>
            </div>
            <div className="relative bg-[#d0c9ea] border border-[#8c52ff] rounded-2xl px-6 pt-20 pb-10 text-center shadow-lg shadow-purple-300/50">
                {/* Floating Icon */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 bg-[url('/Images/Temp.png')] bg-contain bg-no-repeat"></div>
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-semibold text-[#572c73] mb-4">Temporary Rooms</h3>

                {/* Description */}
                <p className="text-[#655687] text-[16px] leading-relaxed">
                    Rooms disappear as soon as everyone leaves. No messages are saved and nothing stays behind. It feels like the chat never existed. Perfect for quick private conversations that leave no trace.
                </p>
            </div>
            <div className="relative bg-[#d0c9ea] border border-[#8c52ff] rounded-2xl px-6 pt-20 pb-10 text-center shadow-lg shadow-purple-300/50">
                {/* Floating Icon */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 bg-[url('/Images/Anon.png')] bg-contain bg-no-repeat"></div>
                </div>

                {/* Heading */}
                <h3 className="text-2xl font-semibold text-[#572c73] mb-4">Completely Anonymous</h3>

                {/* Description */}
                <p className="text-[#655687] text-[16px] leading-relaxed">
                    No logins, no emails, and no profiles. Just enter a room code and start chatting. You stay private and your identity stays yours.
                There's nothing to sign up for and nothing to reveal. Connect instantly and leave with no trace.     </p>
            </div>

        </div>
      </div>
    </div>
  )
}

export default About 