import { getStorage, ref, listAll, getDownloadURL } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import artstation from '../assets/artstation.svg';

function ListFiles() {
  const storage = getStorage();
  const listRef = ref(storage, '/files/kheryan/');

  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      const theFalconLore = document.getElementById('theFalconLore');
      const hanselGretel = document.getElementById('hanselGretel');
      const newImage = document.createElement('img');
      getDownloadURL(ref(storage, `/files/kheryan/${itemRef.name}`)).then((url) => {
        newImage.setAttribute('id', itemRef.name);
        newImage.classList.add('artwork-image');
        newImage.src = url;
        if (itemRef.name.includes('thefalconlore')) {
          theFalconLore.appendChild(newImage);
        } else if (itemRef.name.includes('hanselgretel')) {
          hanselGretel.appendChild(newImage);
        }
      })
    })
  });

  return (
    <div className="main-container">
      <header className="header">
        <div className="links-container">
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="title-container">
          <img src="title-Artwork.png" alt="page title" className="title-image" />
          <h4>Visual Development Artist</h4>
        </div>
        <div className="media-container">
          <SocialIcon url='https://www.instagram.com/ramijuma/' bgColor='#00000000' fgColor='#000' />
          <SocialIcon url='https://www.linkedin.com/in/ramijuma/' bgColor='#00000000' fgColor='#000' />
          <a className="artstation-btn" href='https://www.artstation.com/ramijuma'>
            <img className="artstation" src={artstation} alt='artstation logo' />
          </a>
        </div>
      </header>
      <div id='imageContainer' className='image-container'>
        <div>
          <h2>The Falcon Lore</h2>
          <div id='theFalconLore' className='the-falcon-lore'>
          </div>
        </div>
        <div>
          <h2>Hansel & Gretel</h2>
          <div id='hanselGretel' className='hansel-gretel'>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListFiles;
