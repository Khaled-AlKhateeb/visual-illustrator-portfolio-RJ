import { useNavigate, useLocation } from 'react-router-dom';
import Image from './Image';

function Slider() {
  const navigate = useNavigate();
  const location = useLocation();

  const sliderClose = () => {
    navigate(-1);
  }

  const imgUrl = location.state;
  return (
    <div className="slider-main-container">
      <div className="slider-container">
        <button className="slider-close" onClick={sliderClose}>X</button>
        <button className="next-slide">Next</button>
        <Image imageUrl={imgUrl} />
        <button className="prev-slide">Prev</button>
      </div>
    </div>
  )
}

export default Slider;