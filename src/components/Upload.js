import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, app } from '../firebaseConfig';
import Progress from './ProgressBar';
import '../../src/App.css';

function Upload() {
  const [file, setFile] = useState('');
  const [percent, setPercent] = useState(0);
  const storage = getStorage(app);
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
    console.log(storageRef.child);

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
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
      );
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
    </div>
  );
}

export default Upload;
