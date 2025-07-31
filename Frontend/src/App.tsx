import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Page1 from "./Components/Page1"
import Hero from "./Components/Hero.tsx"
import Navbar from "./Components/Navbar.tsx"
import About from "./Components/About.tsx"

const App = () => {
  return (
    <Router>
      <div className="bg-[url('/Images/HomeBg.png')] bg-cover bg-bottom w-full h-screen" >
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <>
              <Hero/>
            </>
          } />
          <Route path="/about" element={<About/>} />
          <Route path="/page1" element={<Page1/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
