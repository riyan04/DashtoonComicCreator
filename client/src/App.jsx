import { useState } from 'react'
import Home from './Home';
import ComicGenerator from './ComicGenerator'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  // return (
  //   <div className="App">
  //     <header className="App-header bg-blue-500 text-white p-4">
  //       <h1 className="text-2xl font-bold">Comic Strip Generator</h1>
  //     </header>
  //     <main className="p-4">
  //       <ComicGenerator />
  //     </main>
  //   </div>
  // )

  return (
    <Router>
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/comic-generator' element = {<ComicGenerator />} />
      </Routes>
    </Router>
  )
}

export default App
