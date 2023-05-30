import Upload from './components/Upload';
import ListFiles from './components/ListFiles';
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Slider from './components/Slider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getStorage, app, ref, listAll, getDownloadURL } from './firebaseConfig';
import { useDispatch } from 'react-redux';
import { setData } from './redux/reducers/categorySlice';

import './App.css';

function App() {
  const storage = getStorage(app);
  const listRef = ref(storage, '/Data');
  const dispatch = useDispatch();

  listAll(listRef).then((res) => {
    res.prefixes.forEach((itemRef) => {
      const itemImages = [];
      const listImages = ref(storage, `/Data/${itemRef.name}`);
      listAll(listImages).then((result) => {
        result.items.forEach((imageRef) => {
          getDownloadURL(ref(storage, `/Data/${itemRef.name}/${imageRef.name}`))
          .then((url) =>  ({
            name: imageRef.name,
            url: url,
          }))
          itemImages.push(imageRef.name);
        });
        dispatch(setData({name: itemRef.name, images: itemImages}));
      })
    });
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
