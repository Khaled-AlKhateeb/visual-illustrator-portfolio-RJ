import { useRef } from 'react';
import { getStorage, ref, listAll, getDownloadURL } from '../firebaseConfig';

function ListFiles() {
  const storage = getStorage();
  const listRef = ref(storage, '/files/kheryan/');
  const theFalconLore = useRef(null);
  const hanselGretel = useRef(null);

  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      const newImage = document.createElement('img');
      getDownloadURL(ref(storage, `/files/kheryan/${itemRef.name}`)).then((url) => {
        newImage.setAttribute('id', itemRef.name);
        newImage.classList.add('artwork-image');
        newImage.src = url;
        if (itemRef.name.includes('thefalconlore')) {
          theFalconLore.current.appendChild(newImage);
        } else if (itemRef.name.includes('hanselgretel')) {
          hanselGretel.current.appendChild(newImage);
        }
      })
    })
  });

  return (
    <div className="main-container">
      
      <div id='imageContainer' className='image-container'>
        <div>
          <h2>The Falcon Lore</h2>
          <div ref={theFalconLore} className='the-falcon-lore'>
          </div>
        </div>
        <div>
          <h2>Hansel & Gretel</h2>
          <div ref={hanselGretel} className='hansel-gretel'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFiles;
