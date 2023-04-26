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
        <Link to="/about">About</Link>
        <h1>Rami Juma</h1>
        <div className="media-container">
          <SocialIcon url='https://www.linkedin.com/in/ramijuma/' />
          <SocialIcon url='mailto:rami.juma@gmail.com' />
          <SocialIcon url='https://www.instagram.com/ramijuma/' />
          <a className="artstation-btn" href='https://www.artstation.com/ramijuma'>
            <img className="artstation" src={artstation} />
          </a>
        </div>
      </header>
      <div id='imageContainer'>
      </div>
    </div>
  );
}

export default ListFiles;
