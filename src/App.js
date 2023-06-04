import Upload from './components/Upload';
import ListFiles from './components/ListFiles';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Slider from './components/Slider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loaded } from './redux/reducers/categorySlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loaded());
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ListFiles />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/slider' element={<Slider />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
