import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListFiles = () => {
  const dataArr = useSelector((state) => state.categoryData);
  const storedArray = dataArr.allImgs;
  const data = dataArr.allData;
  return (
    <div className='main-container'>
      {data.map((value, key) => {
        console.log(value.name);
        return (
          <div key={key}>
            <h2 className='category-title'>{value.name}</h2>
            <div className='category-container'>
              {value.imgs.map((img, item) => {
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
