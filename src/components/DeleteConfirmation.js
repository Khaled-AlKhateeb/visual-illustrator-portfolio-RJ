import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setOpen, imageDelete } from '../redux/reducers/categorySlice';

const AlertDialog = ({ category, image }) => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categoryData);

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  const handleDelete = () => {
    dispatch(imageDelete({ categoryName: category, imageName: image }));
  };

  return (
    <div className="delete-confirmation">
      <div
        className="delete-dialog"
        open={categoryData.open}
        onClose={handleClose}
      >
        <h3 id="alert-dialog-title">
          {"ARE YOU SURE?"}
        </h3>
        <div className="delete-btn-container">
          <button className="delete-dialog-btn" onClick={handleClose}>cancel</button>
          <button className="delete-dialog-btn" onClick={handleDelete} autoFocus>delete</button>
        </div>
      </div>
    </div>
  );
}

export default AlertDialog;