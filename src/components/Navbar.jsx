import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex md:justify-around justify-center flex-col md:flex-row items-center  p-3 bg-slate-800 text-white'>
      <div className="logo">
        <span className="font-semibold text-2xl hover:text-sky-400">To-Do Planner</span>
      </div>

      <ul className="flex gap-8 my-2">
        <li className='text-lg cursor-pointer hover:font-semibold hover:text-sky-400 transition-all'>Home</li>
        <li className='text-lg cursor-pointer hover:font-semibold hover:text-sky-400 transition-all'>About</li>
        <li className='text-lg cursor-pointer hover:font-semibold hover:text-sky-400 transition-all'>Your Tasks</li>
      </ul>
    </nav>
    
  )
}

export default Navbar