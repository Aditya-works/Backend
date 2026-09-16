import React from 'react'
import {RouterProvider} from "react-router"
import routes from './App.routes'
import './App.css'// css files work differently its already being used once imported like this.
const App = () => {
  return (
    <RouterProvider router = {routes}/>
  )
}

export default App
