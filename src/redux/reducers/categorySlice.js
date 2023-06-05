import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listAll, ref, getStorage, app, getDownloadURL, uploadBytesResumable, deleteObject } from '../../firebaseConfig';

const storage = getStorage(app);
const storageDelete = getStorage();

export const loaded = createAsyncThunk('categorySlice/loadData', async (payload, { dispatch }) => {
  const listRef = ref(storage, '/Data');
  const res = await listAll(listRef);
  const dirPromises = [];
  const data = {};
  res.prefixes.forEach((itemRef) => {
    dispatch(setCategoryList(itemRef.name));
    const listCategories = ref(storage, `/Data/${itemRef.name}`);
    dirPromises.push(listAll(listCategories));
  });
  const categoriesResolved = await Promise.all(dirPromises);
  const imgArray = [];
  await Promise.all(
    categoriesResolved.map(async (imgRef) => {
      await Promise.all(
        imgRef.items.map(async (item) => {
          const imagePromise = getDownloadURL(ref(storage, item._location.path_));
          const path = item._location.path_.split('/');
          const categoryName = path[1];
          const fileName = path[2];
          const imgfile = {
            name: fileName,
            url: await imagePromise
          };
          imgArray.push(imgfile);
          if (!data[categoryName])
          data[categoryName] = [];
          data[categoryName].push(imgfile);
        })
      );
    })
  );
  dispatch(setAllImgs(imgArray));
  return data;
});

export const uploadImage = createAsyncThunk('categorySlice/uploadData', async (payload, { dispatch }) => {
  const { category, img } = payload;
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
        }, 4000);
      }
    },
    (err) => alert(err),
  );

  dispatch(loaded());
});

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
    file: [],
    uploadSelectedCategory: '',
    uploadDone: '',
    newCategory: '',
    categoryList: [],
    deleteEntry: '',
    uploadMessageText: '',
    categoryInput: '',
    open: false,
    allImgs: []
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
        state.allImgs = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loaded.fulfilled, (state, action) => {
      state.allData = action.payload;
    });
  },
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
  setAllImgs
} = categorySlice.actions;

export default categorySlice.reducer;