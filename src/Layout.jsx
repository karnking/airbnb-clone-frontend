import React from 'react'
import Header from './Components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
        <div className='layout'>
        <Header/>
        <Outlet/>
        {/* <Outlet />: The <Outlet> component is a special component provided by React Router. It serves as a placeholder where child routes will be rendered. In the context of React Router, an "outlet" is a location in the parent layout where the content of child routes will be inserted. */}
    </div>
    </div>
  )
}

export default Layout;