import Upload from './components/Upload';
import ListFiles from './components/ListFiles';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Slider from './components/Slider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import setLocalStorage from './localStorage';

import './App.css';

function App() {
  setLocalStorage();
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
