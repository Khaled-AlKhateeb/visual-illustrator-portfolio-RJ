import { useState, useRef } from 'react';
import Progress from './ProgressBar';
import '../../src/App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  uploadImage,
  imageDelete,
  setFile,
  uploadSelectedCategory,
  setUploadSelectedCategory,
  newCategory,
  setNewCategory,
  setCategoryList,
  setDeleteEntry,
} from '../redux/reducers/categorySlice';
import AlertDialog from './DeleteConfirmation';

const Upload = () => {
  const dispatch = useDispatch();
  const categoryNames = useSelector((state) => state.categoryData);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const categoryInput = useRef(null);
  const uploadMessage = useRef(null);
  const deleteItems = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_UPLOAD_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleSelectedImage = (event) => {
    const fileSelected = event.target.files[0];
    dispatch(setFile(fileSelected));
  };

  const handleNewCategory = (event) => {
    const newCategoryInput = event.target.value;
    dispatch(setNewCategory(newCategoryInput));
  }

  const handleUploadCategory = () => {
    dispatch(setCategoryList(categoryNames.newCategory));
    dispatch(setNewCategory(''));
    categoryInput.current.value = '';
  }

  const handleSelectChange = (event) => {
    dispatch(setUploadSelectedCategory(event.target.value));
  }
  
  const handleUpload = () => {
    dispatch(uploadImage({ category: categoryNames.uploadSelectedCategory, img: categoryNames.file }));
  }
  
  const handleModifyCategoryList = () => {
    dispatch(setDeleteEntry(deleteItems.current.value));
  }
  
  const selectImageText = categoryNames.file.name ? categoryNames.file.name : 'Select Image';

  const renderOptions = categoryNames.categoryList.map((cat, index) => <option key={index} value={cat}>{cat}</option>);
  
  const renderImages = () =>
  {for (const key of Object.keys(categoryNames.allData)) {
    const category = categoryNames.allData[key];
      if (categoryNames.deleteEntry === key) {
        return category.map((image, index) => {
          const handleDelete = () => {
            dispatch(imageDelete({categoryName: categoryNames.deleteEntry, imageName: image.name} ))
          };
  
          return <div key={index} className="delete-item-container">
            <img className="delete-item" src={image.url} alt={image.name} />
            <AlertDialog delete={handleDelete} />
          </div>
        });
      }
    }
  }
  
  return (
    <div className="upload-container">
      {isLoggedIn ? (
        <>
          <div>
            <h3>Upload Images</h3>
            <div className="create-container">
              <input className="upload-category" type="text" value={newCategory} ref={categoryInput} onChange={handleNewCategory} placeholder='New Category Name' />
              <button className="add-category-btn" onClick={handleUploadCategory}>Create</button>
            </div>
          </div>
          <label className="upload-label" htmlFor="uploadInput">
            {selectImageText}
            <input className="upload-input" id="uploadInput" type="file" accept="" onChange={handleSelectedImage} />
          </label>
          <select className="delete-options" value={uploadSelectedCategory} onChange={handleSelectChange}>
            <option value="" hidden>Select a Category</option>
            {categoryNames.categoryList.map((entry, index) => (
              <option key={index} value={entry}>
                {entry}
              </option>
            ))}
          </select>
          <button className="upload-btn" onClick={handleUpload}>Upload to Firebase</button>
          <Progress animated percent={categoryNames.percent} />
          <p ref={uploadMessage} className="uploaded">{categoryNames.uploadDone}{categoryNames.uploadMessageText}</p>
          <div className="delete-main-container">
            <h3>Delete Images</h3>
            <select className="delete-options" ref={deleteItems} onChange={handleModifyCategoryList}>
              <option value="" hidden>Select Category</option>
              {renderOptions}
            </select>
            <div className="delete-container">
              {renderImages()}
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
