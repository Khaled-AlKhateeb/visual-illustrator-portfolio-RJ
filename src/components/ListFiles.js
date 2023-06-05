import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListFiles = () => {
  const dataArr = useSelector((state) => state.categoryData);
  const data = Object.entries(dataArr?.allData);
  const storedArray = dataArr?.allImgs;

  return (
    <div className='main-container'>
      {data.map((value, key) => {
        return (
          <div key={key}>
            <h2 className='category-title'>{value[0]}</h2>
            <div className='category-container'>
              {value[1].map((img, item) => {
                return (
                  <Link
                    className='image-container'
                    to='/slider'
                    key={item}
                    state={{ name: img.name, array: storedArray }}
                  >
                    <Image imageUrl={img.url} imageName={img.name} class='artwork-image' />
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div >
  );
}

export default ListFiles;
