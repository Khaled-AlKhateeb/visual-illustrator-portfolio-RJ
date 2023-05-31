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
    const promises = [];
    res.prefixes.forEach((itemRef) => {
      const itemImages = [];
      const listImages = ref(storage, `/Data/${itemRef.name}`);
      const promise = listAll(listImages).then(async (result) => {
        const imagePromises = [];
        result.items.forEach((imageRef) => {
          const imagePromise = getDownloadURL(ref(storage, `/Data/${itemRef.name}/${imageRef.name}`))
            .then((url) => {
              itemImages.push({
                name: imageRef.name,
                url: url,
              });
            });
          imagePromises.push(imagePromise);
        });
        await Promise.all(imagePromises);
        dispatch(setData({ name: itemRef.name, images: itemImages }));
      });
      promises.push(promise);
    });
    return Promise.all(promises);
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
