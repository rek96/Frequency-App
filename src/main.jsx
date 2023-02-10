import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Footer from './Footer'
import './index.css'
import Intro from './Intro'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='md:flex w-full md:mt-[20%] justify-center items-center'>
      <div className='md:flex bg-slate-900 rounded-[50px] shadow-xl border-white/40 border-2 m-4'>
        <Intro />
        <App />
      </div>
    </div>
    <Footer />
  </React.StrictMode>,
)
