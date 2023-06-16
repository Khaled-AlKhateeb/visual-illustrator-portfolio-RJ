import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  uploadImage,
  setFile,
  setUploadSelectedCategory,
  setNewCategory,
  setDeleteEntry,
  setCategoryList,
  setCategoryOrder,
  setImgOrder,
  setOpen,
  setSelectDelete
} from '../redux/reducers/categorySlice';
import DeleteIcon from '@mui/icons-material/Delete';
import Progress from './ProgressBar';
import '../../src/App.css';
import AlertDialog from './DeleteConfirmation';

const Upload = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categoryData);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const categoryInputRef = useRef(null);
  const categoryOrderInputRef = useRef(null);
  const imgOrderInputRef = useRef(null);
  const deleteItemsRef = useRef(null);

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
  };

  const handleSelectedImage = (event) => {
    dispatch(setFile(event.target.files[0]));
  };

  const handleNewCategory = () => {
    const newCategoryInput = categoryInputRef.current.value;
    const newCategoryOrder = categoryOrderInputRef.current.value;
    dispatch(setNewCategory(newCategoryInput));
    dispatch(setCategoryOrder(newCategoryOrder));
  };

  const handleUploadCategory = () => {
    if (!categoryInputRef.current.value || !categoryOrderInputRef.current.value) {
      window.alert('Select category and order');
    } else {
      dispatch(setCategoryList({ name: categoryData.newCategory, order: categoryData.categoryOrder }));
      dispatch(setNewCategory(''));
      categoryOrderInputRef.current.value = '';
    }
  };

  const handleSelectChange = (event) => {
    dispatch(setUploadSelectedCategory(event.target.value));
  };

  const handleUpload = () => {
    dispatch(uploadImage({ category: categoryData.uploadSelectedCategory, img: categoryData.file, imgOrder: categoryData.imgOrder }));
    imgOrderInputRef.current.value = '';
  };

  const handleModifyCategoryList = () => {
    dispatch(setDeleteEntry(deleteItemsRef.current.value));
  };

  const renderOptions = () =>
    categoryData.categoryList.map((cat, index) => (
      <option key={index} value={cat.name}>
        {cat.name}
      </option>
    ));
  const renderImages = () => {
    const selectedCategory = categoryData.allData.find((category) => category.name === categoryData.deleteEntry);
    if (selectedCategory) {
      return selectedCategory.imgs.map((image, index) => {
        const handleAlert = () => {
          dispatch(setSelectDelete(image.name));
          dispatch(setOpen(true));
        };

        return (
          <div key={index} className="delete-item-container">
            <img className="delete-item" src={image.url} alt={image.name} />
            <button className='delete-btn' onClick={handleAlert}><DeleteIcon sx={{ fontSize: 40 }} /></button>
            {categoryData.open && image.name === categoryData.selectDelete && (
              <AlertDialog
                category={categoryData.deleteEntry}
                image={image.name}
              />
            )}
          </div>
        );
      });
    }
  };

  const selectImageText = categoryData.file ? categoryData.file.name : 'Select Image';

  return (
    <div className="upload-container">
      {isLoggedIn ? (
        <>
          <div>
            <h3>Upload Images</h3>
            <div className="create-container">
              <input className="upload-category" type="text" value={categoryData.newCategory} ref={categoryInputRef} placeholder="New Category Name" onChange={handleNewCategory} />
              <input className="category-order" type="number" min={1} ref={categoryOrderInputRef} placeholder="Order" onChange={handleNewCategory} />
              <button className="add-category-btn" onClick={handleUploadCategory}>
                Create
              </button>
            </div>
          </div>
          <div className="create-container">
            <label className="upload-label" htmlFor="uploadInput">
              {selectImageText}
              <input className="upload-input" id="uploadInput" type="file" accept="" onChange={handleSelectedImage} />
            </label>
            <input className="img-order" type="number" min={1} ref={imgOrderInputRef} onChange={handleImgOrder} placeholder="Order" />
          </div>
          <select className="delete-options" value={categoryData.uploadSelectedCategory} onChange={handleSelectChange}>
            <option value="" hidden>Select a Category</option>
            {renderOptions()}
          </select>
          <button className="upload-btn" onClick={handleUpload}>
            Upload to Firebase
          </button>
          <Progress animated percent={categoryData.percent} />
          <p className={`uploaded ${categoryData.uploadDone ? '' : 'hidden'}`}>
            {categoryData.uploadMessageText}
          </p>
          <div className="delete-main-container">
            <h3>Delete Images</h3>
            <select className="delete-options" ref={deleteItemsRef} onChange={handleModifyCategoryList}>
              <option value="" hidden>Select Category</option>
              {renderOptions()}
            </select>
            <div className="delete-container">{renderImages()}</div>
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
            <button className="add-category-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Upload;
