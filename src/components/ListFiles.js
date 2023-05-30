//import { useEffect, useState } from 'react';
//import Image from './Image';
//import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const ListFiles = () => {
  const categorys = useSelector((state) => state.categoryData);
  console.log(categorys);

  return (
    <div className='main-container'>
      {/*{categoryArr.map((cat, index) => {
        return (
          <div key={index}>
            <h2 className='category-title'>{cat}</h2>
            <div className='category-container'>*/}
              {/*{storedArray.map((img, item) => {
                if (img.category === index) {
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
                }
                return null;
              })}*/}
            {/*</div>
          </div>
        )
      })}*/}
    </div>
  );
}

export default ListFiles;
