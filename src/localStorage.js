import { getStorage, ref, listAll, getDownloadURL } from './firebaseConfig';

const storage = getStorage();
const listRef = ref(storage, '/files/kheryan/');
const obj = {
  name: '',
  url: ''
}

function setLocalStorage() {
  localStorage.clear();
  listAll(listRef).then((res) => {
    res.items.forEach((itemRef, index) => {
      getDownloadURL(ref(storage, `/files/kheryan/${itemRef.name}`)).then((url) => {
        obj.name = itemRef.name;
        obj.url = url;
        localStorage.setItem(`image-${index}`, JSON.stringify(obj));
      })
    })
  });
}

export default setLocalStorage;