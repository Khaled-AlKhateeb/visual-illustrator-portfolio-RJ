import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import artstation from '../assets/artstation.svg';
import { useRef, useState } from "react";

function Header() {
  const toggleRef = useRef(null);
  const [firstStripe, setFirstStripe] = useState('first-stripe');
  const [secondStripe, setSecondStripe] = useState('second-stripe');
  const [thirdStripe, setThirdStripe] = useState('third-stripe');

  const toggleMenu = () => {
    if (toggleRef.current.style.display === '') {
      setFirstStripe('first-stripe close-first');
      setSecondStripe('second-stripe close-second');
      setThirdStripe('third-stripe close-third');
      toggleRef.current.style.display = 'flex';
      toggleRef.current.style.right = '0';
    } else {
      setFirstStripe('first-stripe');
      setSecondStripe('second-stripe');
      setThirdStripe('third-stripe')
      toggleRef.current.style.display = '';
      toggleRef.current.style.right = '-50%';
    }
  }

  return (
      <div className="header-main-container">
        <div className="mobile-menu" ref={toggleRef} >
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <SocialIcon url='https://www.instagram.com/ramijuma/' bgColor='#00000000' fgColor='#3a523e' />
          <SocialIcon url='https://www.linkedin.com/in/ramijuma/' bgColor='#00000000' fgColor='#3a523e' />
          <a className="artstation-btn" href='https://www.artstation.com/ramijuma'>
            <img className="artstation" src={artstation} alt='artstation logo' />
          </a>
        </div>
            <header className="header">
        <button className="menu-btn" onClick={toggleMenu}>
          <div className={firstStripe} />
          <div className={secondStripe} />
          <div className={thirdStripe} />
        </button>
        <div className="links-container">
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="title-container">
          <Link to={"/"}>
            <img src="title-Artwork.png" alt="page title" className="title-image" />
          </Link>
          <h4 className="position-title">Visual Development Artist</h4>
        </div>
        <div className="media-container">
          <SocialIcon url='https://www.instagram.com/ramijuma/' bgColor='#00000000' fgColor='#3a523e' />
          <SocialIcon url='https://www.linkedin.com/in/ramijuma/' bgColor='#00000000' fgColor='#3a523e' />
          <a className="artstation-btn" href='https://www.artstation.com/ramijuma'>
            <img className="artstation" src={artstation} alt='artstation logo' />
          </a>
        </div>
            </header>
      </div>
  )
}

export default Header;