import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects' 
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='min-h-screen bg-gray-900 text-white font-sans antialiased w-[100vw] '>
      <Hero/>
      <About />
      <Skills />
      <Projects /> 
      <Contact /> 
      <Footer /> 
    </div>
  )
}

export default Home
