import { useState, useRef, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, deleteObject, app } from '../firebaseConfig';
import Progress from './ProgressBar';
import '../../src/App.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteImage } from '../redux/reducers/categorySlice';
import AlertDialog from './DeleteConfirmation';

const Upload = () => {
  const categoryNames = useSelector((state) => state.categoryData);
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState('');
  const [entryList, setEntryList] = useState([]);
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);
  const [deleteName, setDeleteName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const categoryInput = useRef(null);
  const storage = getStorage(app);
  const storageDelete = getStorage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_UPLOAD_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    const categorys = categoryNames.names.map((cat) => cat.name);
    setEntryList(categorys);
  }, [categoryNames]);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadDone = document.getElementById('uploadDone');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleSelectChange = (event) => {
    setSelectedEntry(event.target.value);
  }

  const handleCreateEntry = () => {
    if (inputValue.trim() !== '') {
      setEntryList([...entryList, inputValue]);
      setInputValue('');
      categoryInput.current.value = inputValue;
    }
  }

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!")
    }

    const storageRef = ref(storage, `/Data/${selectedEntry}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent(percent);
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const resetPercent = async (percent) => {
          await delay(2000);
          if (percent === 100) {
            setFile('');
            setPercent(0);
          };
        }
        if (percent === 100) {
          uploadDone.innerHTML = 'Uploaded Successfully';
          setTimeout(function () {
            uploadDone.innerHTML = '';
            categoryInput.current.value = '';
            setSelectedEntry('');
          }, 4000);
        }
        resetPercent(percent);
      },
      (err) => alert(err),
    );
  }

  const deleteItems = useRef(null);

  const handleNameSelect = () => {
    setDeleteName(deleteItems.current.value);
  }

  const selectImageText = file.name ? file.name : 'Select Image';

  const renderOptions = categoryNames.names.map((cat, index) => <option key={index} value={cat.name}>{cat.name}</option>);

  const renderImages = categoryNames.names.map((item) => {
    if (deleteName === item.name) {
      return item.images.map((image, index) => {
        const handleDelete = () => {
          const desertRef = ref(storageDelete, `/Data/${item.name}/${image.name}`);
          deleteObject(desertRef).then(() => {
            dispatch(deleteImage({ categoryName: item.name, imageName: image.name }));
            uploadDone.innerHTML = `${image.name} deleted successfully`;
            setTimeout(function () {
              uploadDone.innerHTML = '';
            }, 4000);
          }).catch((err) => {
            alert(err);
          });
        };

        return <div key={index} className="delete-item-container">
          <img className="delete-item" src={image.url} alt={image.name} />
          <AlertDialog delete={handleDelete} />
        </div>
      });
    }
    return null;
  })

  return (
    <div className="upload-container">
      {isLoggedIn ? (
        <>
          <div>
            <h3>Upload Images</h3>
            <div className="create-container">
              <input className="upload-category" type="text" value={inputValue} ref={categoryInput} onChange={handleInputChange} placeholder='New Category Name' />
              <button className="add-category-btn" onClick={handleCreateEntry}>Create</button>
            </div>
          </div><label className="upload-label" htmlFor="uploadInput">
            {selectImageText}
            <input className="upload-input" id="uploadInput" type="file" accept="" onChange={handleChange} />
          </label><select className="delete-options" value={selectedEntry} onChange={handleSelectChange}>
            <option value="" hidden>Select a Category</option>
            {entryList.map((entry, index) => (
              <option key={index} value={entry}>
                {entry}
              </option>
            ))}
          </select><button className="upload-btn" onClick={handleUpload}>Upload to Firebase</button><Progress animated percent={percent} /><p id='uploadDone' className="uploaded"></p><div className="delete-main-container">
            <h3>Delete Images</h3>
            <select className="delete-options" ref={deleteItems} onChange={handleNameSelect}>
              <option value="" hidden>Select Category</option>
              {renderOptions}
            </select>
            <div className="delete-container">
              {renderImages}
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="create-container">
            <input
              type="password"
              autoComplete="new-password"
              className="upload-category"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="add-category-btn" type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Upload;
