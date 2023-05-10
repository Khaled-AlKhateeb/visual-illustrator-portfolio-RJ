import { useNavigate, useLocation } from 'react-router-dom';
import Image from './Image';
import { useEffect, useRef, useState } from 'react';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

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

  const buttonContainerRef = useRef(null);
  const buttonsRef = useRef([]);

  const [showButtons, setShowButtons] = useState(true);
  
  useEffect(() => {
    let timeoutId;
    const buttonContainer = buttonContainerRef.current;

    const hideButtons = () => {
      setShowButtons(false);
    };

    const showButtons = () => {
      setShowButtons(true);
      resetTimeout();
    };

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(hideButtons, 2000);
    };

    if (buttonContainer) {
      buttonContainer.addEventListener("mousemove", showButtons);
      buttonContainer.addEventListener("mousedown", showButtons);
      buttonContainer.addEventListener("keypress", showButtons);
      resetTimeout();
    }

    return () => {
      if (buttonContainer) {
        buttonContainer.removeEventListener("mousemove", showButtons);
        buttonContainer.removeEventListener("mousedown", showButtons);
        buttonContainer.removeEventListener("keypress", showButtons);
      }

      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <div className="slider-main-container" ref={buttonContainerRef}>
      {showButtons && (
        <>
          <button className="slider-close" ref={(el) => buttonsRef.current.push(el)} onClick={sliderClose}><GrClose size={35} /></button>
          <button className="next-slide" ref={(el) => buttonsRef.current.push(el)} onClick={nextImg}><BsChevronRight size={56} /></button>
          <button className="prev-slide" ref={(el) => buttonsRef.current.push(el)} onClick={prevImg}><BsChevronLeft size={56} /></button>
        </>
      )}
      <div className="slider-container">
        <Image imageUrl={allImgs[currentIndex].url} imageName={allImgs[currentIndex].name} class='slider-image' />
      </div>
    </div>
  )
}

export default Slider;