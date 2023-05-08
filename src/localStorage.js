import { useEffect } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from './firebaseConfig';


const LocalStorage = () => {
  useEffect(() => {
    const storage = getStorage();
    const listRef = ref(storage, '/files/kheryan/');

    listAll(listRef).then((res) => {
      const promises = res.items.map((itemRef, index) =>
        getDownloadURL(ref(storage, `/files/kheryan/${itemRef.name}`))
        .then((url) => ({
          id: index,
          name: itemRef.name,
          url: url
        }))
      );
      Promise.all(promises).then((results) => {
        const updatedArr = results.map((obj) => obj);
        localStorage.setItem('Storage', JSON.stringify(updatedArr));
      });
    }).catch((error) => {
    console.log(error)
  })
  }, []);
  return null
}

export default LocalStorage;