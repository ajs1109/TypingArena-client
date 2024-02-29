import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = props => {
  return (
    <div className="w-[100vw] h-screen max-h-screen text-[#eef1f3] bg-[#222736]">
      <Header/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default Layout