import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import artstation from '../assets/artstation.svg';

function Header() {
  return (
    <header className="header">
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
          <SocialIcon url='https://www.instagram.com/ramijuma/' bgColor='#00000000' fgColor='#000' />
          <SocialIcon url='https://www.linkedin.com/in/ramijuma/' bgColor='#00000000' fgColor='#000' />
          <a className="artstation-btn" href='https://www.artstation.com/ramijuma'>
            <img className="artstation" src={artstation} alt='artstation logo' />
          </a>
        </div>
      </header>
  )
}

export default Header;