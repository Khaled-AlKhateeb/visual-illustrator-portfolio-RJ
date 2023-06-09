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
  setCategoryOrder,
  categoryOrder,
  imgOrder,
  setImgOrder
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
  const categoryOrderInput = useRef(null);
  const imgOrderInput = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === process.env.REACT_APP_UPLOAD_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  const handleImgOrder = (event) => {
    dispatch(setImgOrder(event.target.value));
  }

  const handleSelectedImage = (event) => {
    dispatch(setFile(event.target.files[0]));
  };
  
  const handleNewCategory = () => {
    const newCategoryInput = categoryInput.current.value;
    const newCategoryOrder = categoryOrderInput.current.value;
    dispatch(setNewCategory(newCategoryInput));
    dispatch(setCategoryOrder(newCategoryOrder));
  }

  const handleUploadCategory = () => {
    if (categoryInput.current.value === '' || categoryOrderInput.current.value === '') {
      window.alert('Select category and order');
    } else {
      dispatch(setCategoryList({name: categoryNames.newCategory, order: categoryNames.categoryOrder}));
      dispatch(setNewCategory(''));
      categoryOrderInput.current.value = '';
    }
  }

  const handleSelectChange = (event) => {
    dispatch(setUploadSelectedCategory(event.target.value));
  }
  
  const handleUpload = () => {
    dispatch(uploadImage({ category: categoryNames.uploadSelectedCategory, img: categoryNames.file, imgOrder: categoryNames.imgOrder }));
    imgOrderInput.current.value = '';
  }
  
  const handleModifyCategoryList = () => {
    dispatch(setDeleteEntry(deleteItems.current.value));
  }
  
  
  const renderOptions = () => categoryNames.categoryList.map((cat, index) => {
    return <option key={index} value={cat.name}>{cat.name}</option>
  });
  
  const renderImages = () => {
    for (const key of Object.keys(categoryNames.allData)) {
      const category = categoryNames.allData[key];
      if (categoryNames.deleteEntry === key) {
        return category.map((image, index) => {
          const handleDelete = () => {
            dispatch(imageDelete({ categoryName: categoryNames.deleteEntry, imageName: image.name }))
          };
          
          return <div key={index} className="delete-item-container">
            <img className="delete-item" src={image.url} alt={image.name} />
            <AlertDialog delete={handleDelete} />
          </div>
        });
      }
    }
  };
  
  const selectImageText = categoryNames.file ? categoryNames.file.name : 'Select Image';

  return (
    <div className="upload-container">
      {isLoggedIn ? (
        <>
          <div>
            <h3>Upload Images</h3>
            <div className="create-container">
              <input className="upload-category" type="text" value={categoryNames.newCategory} ref={categoryInput} placeholder='New Category Name' onChange={handleNewCategory} />
              <input className="category-order" type="number" min={1} ref={categoryOrderInput} placeholder="Order" onChange={handleNewCategory} />
              <button className="add-category-btn" onClick={handleUploadCategory}>Create</button>
            </div>
          </div>
          <div className="create-container">
            <label className="upload-label" htmlFor="uploadInput">
              {selectImageText}
              <input className="upload-input" id="uploadInput" type="file" accept="" onChange={handleSelectedImage} />
            </label>
            <input className="img-order" type="number" min={1} ref={imgOrderInput} onChange={handleImgOrder} placeholder="Order" />
          </div>
          <select className="delete-options" value={uploadSelectedCategory} onChange={handleSelectChange}>
            <option value="" hidden>Select a Category</option>
            {renderOptions()}
          </select>
          <button className="upload-btn" onClick={handleUpload}>Upload to Firebase</button>
          <Progress animated percent={categoryNames.percent} />
          <p ref={uploadMessage} className="uploaded">{categoryNames.uploadDone}{categoryNames.uploadMessageText}</p>
          <div className="delete-main-container">
            <h3>Delete Images</h3>
            <select className="delete-options" ref={deleteItems} onChange={handleModifyCategoryList}>
              <option value="" hidden>Select Category</option>
              {renderOptions()}
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
