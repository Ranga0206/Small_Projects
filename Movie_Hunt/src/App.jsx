import React from 'react'
import { Header, Footer } from "./components"
import AllRoutes from './routes/AllRoutes'
import "./App.css"

const App = () => {
  return (
    <div>
      <Header />
      <AllRoutes />
      <Footer />
    </div>
  )
}

export default App