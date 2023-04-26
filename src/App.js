import Upload from './components/Upload';
import ListFiles from './components/ListFiles';
import About from './components/About';
import Contact from './components/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListFiles />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
