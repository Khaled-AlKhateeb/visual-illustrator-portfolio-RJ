import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, getStorage, app, getDownloadURL, uploadBytesResumable, deleteObject, db, setDoc, doc, getDoc, deleteDoc } from '../../firebaseConfig';

const storage = getStorage(app);
const storageDelete = getStorage();

export const loaded = createAsyncThunk('categorySlice/loadData', async (payload, { dispatch }) => {
  const docRef = doc(db, "newData", "newEntries");
  const allRef = doc(db, "Data", "allData");
  const docSnap = await getDoc(docRef);
  const allSnap = await getDoc(allRef);
  const docItem = docSnap.data();
  const allItem = allSnap.data();

  function pushObjectsIntoData(dataArray, newObject) {
    if (!dataArray) {
      return [newObject];
    } else if (!newObject) {
      return dataArray.data;
    } else {
      const newArray = dataArray.data
      const categoryIndex = newArray.findIndex((data) => data.name === newObject.name);
      if (categoryIndex !== -1) {
        const existingCategory = newArray[categoryIndex];
        const imgOrderIndex = existingCategory.imgs.findIndex((img) => img.order === newObject.imgs[0].order);
        if (imgOrderIndex !== -1) {
          for (let i = imgOrderIndex; i < existingCategory.imgs.length; i++) {
            existingCategory.imgs[i].order++;
          }
          existingCategory.imgs.push(newObject.imgs[0]);
        } else {
          existingCategory.imgs.push(newObject.imgs[0]);
        }
        existingCategory.imgs.sort((a, b) => a.order - b.order);
      } else {
        const orderIndex = newArray.findIndex((data) => data.order === newObject.order);
        if (orderIndex !== -1) {
          for (let i = orderIndex; i < newArray.length; i++) {
            newArray[i].order++;
          }
          newArray.push(newObject);
        } else {
          newArray.push(newObject);
        }
      }
      newArray.sort((a, b) => a.order - b.order);
      return newArray;
    }
  }

  const data = pushObjectsIntoData(allItem, docItem);

  data.map((cat) => {
    dispatch(setCategoryList({ name: cat.name, order: cat.order }));
    cat.imgs.map((img) => {
      dispatch(setAllImgs(img));
      return null;
    })
    return null;
  });

  await setDoc(doc(db, "Data", "allData"), { data });
  await deleteDoc(doc(db, "newData", "newEntries"));
  return data;
});

export const uploadImage = createAsyncThunk('categorySlice/uploadData', async (payload, { dispatch }) => {
  const { category, img, imgOrder } = payload;
  const storageRef = ref(storage, `/Data/${category}/${img.name}`);
  const uploadTask = uploadBytesResumable(storageRef, img);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percentage = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      dispatch(setPercent(percentage));

      if (percentage === 100) {
        dispatch(setUploadDone(`${img.name} Uploaded Successfully`));
        setTimeout(function () {
          dispatch(setFile([]));
          dispatch(setPercent(0));
          dispatch(setUploadDone(''));
          dispatch(setCategoryInput(''));
          dispatch(setUploadSelectedCategory(''));
          dispatch(fetchUrl({ category, img, imgOrder }))
        }, 4000);
      }
    },
    (err) => alert(err),
  );

});

export const fetchUrl = createAsyncThunk('categorySlice/fetchUrl', async (payload, { dispatch, getState }) => {
  const currentState = getState().categoryData;
  const { category, img, imgOrder } = payload;
  const imageUrl = await getDownloadURL(ref(storage, `Data/${category}/${img.name}`));
  const categoryName = {
    name: category,
    imgs: [{
      name: img.name,
      order: imgOrder,
      url: imageUrl,
    }]
  };
  categoryName.order = Number(currentState.categoryOrder);
  categoryName.imgs[0].order = Number(imgOrder);
  await setDoc(doc(db, "newData", "newEntries"), categoryName);
  dispatch(loaded());
})

export const imageDelete = createAsyncThunk('categorySlice/deleteData', async (payload, { dispatch, getState }) => {
  const { categoryName, imageName } = payload;
  const allRef = doc(db, "Data", "allData");
  const allSnap = await getDoc(allRef);
  const allItem = allSnap.data();
  function deleteFunction(dataArray, dCategoryName, imageName) {
    console.log(dataArray);
    const categoryIndex = dataArray.findIndex((data) => data.name === dCategoryName);
    const categoryFind = dataArray[categoryIndex];
    const selectedDeleteCategory = categoryFind.imgs;
    const imageIndex = categoryFind.imgs.findIndex((img) => img.name === imageName);
    console.log(selectedDeleteCategory, categoryIndex, categoryFind, imageIndex);
    selectedDeleteCategory.splice(imageIndex, 1);
    if (selectedDeleteCategory.length === 0) {
      dataArray.splice(categoryIndex, 1);
    } else {
      categoryFind.imgs = selectedDeleteCategory;
    }
    console.log(dataArray);
    return dataArray;
  };

  const data = deleteFunction(allItem.data, categoryName, imageName);

  await setDoc(doc(db, "Data", "allData"), { data });

  const desertRef = ref(storageDelete, `/Data/${categoryName}/${imageName}`);
  deleteObject(desertRef).then(() => {
    dispatch(setUploadMessageText(`${imageName} deleted successfully`));
    setTimeout(function () {
      dispatch(setUploadMessageText(''));
      dispatch(loaded());
      dispatch(setOpen(false))
    }, 4000);
  }).catch((err) => {
    alert(err);
  });
})

const categorySlice = createSlice({
  name: 'categoryData',
  initialState: {
    allData: [],
    percent: 0,
    file: null,
    uploadSelectedCategory: '',
    uploadDone: '',
    newCategory: '',
    categoryList: [],
    deleteEntry: '',
    uploadMessageText: '',
    categoryInput: '',
    open: false,
    allImgs: [],
    categoryOrder: 0,
    imgOrder: 0,
    fetchUrl: {}
  },
  reducers: {
    setPercent: (state, action) => {
      state.percent = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setUploadSelectedCategory: (state, action) => {
      state.uploadSelectedCategory = action.payload;
    },
    setUploadDone: (state, action) => {
      state.uploadDone = action.payload;
    },
    setNewCategory: (state, action) => {
      state.newCategory = action.payload;
    },
    setCategoryOrder: (state, action) => {
      state.categoryOrder = action.payload;
    },
    setCategoryList: (state, action) => {
      state.categoryList.push(action.payload);
    },
    setDeleteEntry: (state, action) => {
      state.deleteEntry = action.payload;
    },
    setUploadMessageText: (state, action) => {
      state.uploadMessageText = action.payload;
    },
    setCategoryInput: (state, action) => {
      state.categoryInput = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setAllImgs: (state, action) => {
      state.allImgs.push(action.payload);
    },
    setImgOrder: (state, action) => {
      state.imgOrder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loaded.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(fetchUrl.fulfilled, (state, action) => {
        return state;
      })
  }
});

export const {
  percent,
  setPercent,
  file,
  setFile,
  uploadSelectedCategory,
  setUploadSelectedCategory,
  categoryInput,
  setCategoryInput,
  uploadDone,
  setUploadDone,
  newCategory,
  setNewCategory,
  categoryList,
  setCategoryList,
  deleteEntry,
  setDeleteEntry,
  uploadMessageText,
  setUploadMessageText,
  open,
  setOpen,
  allImgs,
  setAllImgs,
  categoryOrder,
  setCategoryOrder,
  imgOrder,
  setImgOrder
} = categorySlice.actions;

export default categorySlice.reducer;