import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, getStorage, app, getDownloadURL, uploadBytesResumable, deleteObject, db, setDoc, doc, getDoc, deleteDoc } from '../../firebaseConfig';

const storage = getStorage(app);
const storageDelete = getStorage();

export const loaded = createAsyncThunk('categorySlice/loadData', async (payload, {dispatch}) => {
  const docRef = doc(db, "Data", "newEntries");
  const allRef = doc(db, "Data", "allData");
  const docSnap = await getDoc(docRef);
  const allSnap = await getDoc(allRef);
  const docItem = docSnap.data();
  const allItem = allSnap.data();
  const data = [];

  await deleteDoc(doc(db, "Data", "allData"));

  if (allItem) {
    allItem.data.map((item) => { data.push(item); return null; })
    if (data.some(item => Object.entries(item).some((value) => value[0] === 'name' && value[1] === docItem.name))) {
      data.map((item) => {
        if (item.name === docItem.name) {
          if (!item.imgs.some(item => Object.entries(item).some((value) => value[0] === 'name' && value[1] === docItem.imgs[0].name))) {
            item.imgs.push(docItem.imgs[0])
          }
        }
        return null;
      })
    } else {
      data.push(docItem);
    }
  } else {
    data.push(docItem);
  };

  data.map((cat) => {
    dispatch(setCategoryList({ name: cat.name, order: cat.order }));
    cat.imgs.map((img) => {
      dispatch(setAllImgs(img));
      return null;
    })
    return null;
  });

  await setDoc(doc(db, "Data", "allData"), { data });

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
          dispatch(fetchUrl({category, img, imgOrder}))
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
    order: currentState.categoryOrder,
    imgs: [{
      name: img.name,
      order: imgOrder,
      url: imageUrl,
    }]
  };
  await setDoc(doc(db, "Data", "newEntries"), categoryName);
  dispatch(loaded());
})

export const imageDelete = createAsyncThunk('categorySlice/deleteData', async (payload, { dispatch }) => {
  const { categoryName, imageName } = payload;
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
      if (!state.allImgs.length) {
        state.allImgs.push(action.payload);
      }
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