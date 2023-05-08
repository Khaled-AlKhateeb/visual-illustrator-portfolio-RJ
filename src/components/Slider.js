import { useNavigate, useLocation } from 'react-router-dom';
import Image from './Image';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegWindowClose } from 'react-icons/fa';

function Slider() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const sliderClose = () => {
    navigate(-1);
  }
  
  const imgName = location.state.name;
  const allImgs = location.state.array;
  const view = allImgs.findIndex((item) => item.name === imgName)
  
  const [currentIndex, setCurrentIndex] = useState(view);

  const nextImg = () => {
    if (currentIndex === allImgs.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((nextIndex) => nextIndex + 1);
    }
  }

  const prevImg = () => {
    if (currentIndex === 0) {
      setCurrentIndex(allImgs.length - 1)
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }

  return ( 
    <div className="slider-main-container">
      <div className="slider-container">
        <button className="slider-close" onClick={sliderClose}><FaRegWindowClose size={40} /></button>
        <button className="next-slide" onClick={nextImg}><FaChevronRight size={56} /></button>
        <Image imageUrl={allImgs[currentIndex].url} imageName={allImgs[currentIndex].name} />
        <button className="prev-slide" onClick={prevImg}><FaChevronLeft size={56} /></button>
      </div>
    </div>
  )
}

export default Slider;