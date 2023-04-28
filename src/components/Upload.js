import { useState, useRef, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, listAll, deleteObject, app } from '../firebaseConfig';
import Progress from './ProgressBar';
import '../../src/App.css';

function Upload() {
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);
  const [deleteName, setDeleteName] = useState('');
  const storage = getStorage(app);
  const storageDelete = getStorage();
  const handleChange = (event) => {
    setFile(event.target.files[0]);
  }

  const uploadDone = document.getElementById('uploadDone');

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!")
    }

    const storageRef = ref(storage, `/files/kheryan/${file.name}`);
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
          }, 4000);
        }
        resetPercent(percent);
      },
      (err) => alert(err),
    );
  }

  const listRef = ref(storage, '/files/kheryan/');
  const deleteItems = useRef(null);

  useEffect(() => {
    listAll(listRef).then((res) => {
      res.items.forEach((itemRef) => {
        const item = document.createElement('option');
        item.innerHTML = itemRef.name;
        item.value = itemRef.name;
        deleteItems.current.appendChild(item);
      })
    })
  }, [deleteItems, listRef]);

  const handleNameSelect = () => {
    setDeleteName(deleteItems.current.value);
  }
  const handleDelete = () => {
    const desertRef = ref(storageDelete, `/files/kheryan/${deleteName}`);
    console.log(desertRef)
    deleteObject(desertRef).then(() => {
      uploadDone.innerHTML = `${deleteName} deleted successfully`;
      setTimeout(function () {
        uploadDone.innerHTML = '';
      }, 4000);
    }).catch((err) => {
      alert(err);
    })
  }

  const selectImageText = file.name ? file.name : 'Select Image';

  return (
    <div className="upload-container">
      <label className="upload-label" htmlFor="uploadInput">
        {selectImageText}
        <input className="upload-input" id="uploadInput" type="file" accept="" onChange={handleChange} />
      </label>
      <button className="upload-btn" onClick={handleUpload}>Upload to Firebase</button>
      <Progress animated percent={percent} />
      <p id='uploadDone' className="uploaded"></p>
      <div className="delete-container">
        <select name="deleteOptions" ref={deleteItems} onChange={handleNameSelect}>
          <option value="" hidden>Select image to delete</option>
        </select>
        <button className="delete-btn" type='button' onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
}

export default Upload;
