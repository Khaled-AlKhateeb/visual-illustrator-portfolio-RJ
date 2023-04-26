import { getStorage, ref, listAll, getDownloadURL } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import artstation from '../assets/artstation.svg';

function ListFiles() {
  const storage = getStorage();
  const listRef = ref(storage, '/files/kheryan/');

  listAll(listRef).then((res) => {
    res.items.forEach((itemRef) => {
      const container = document.getElementById('imageContainer');
      const newImage = document.createElement('img');
      getDownloadURL(ref(storage, `/files/kheryan/${itemRef.name}`)).then((url) => {
        newImage.setAttribute('id', itemRef.name);
        newImage.src = url;
        container.appendChild(newImage);
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
          <h1>Rami Juma</h1>
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
      </div>
    </div>
  );
}

export default ListFiles;
