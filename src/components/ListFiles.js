import React, { useEffect, useState } from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListFiles = () => {
  const dataArr = useSelector((state) => state.categoryData);
  const data = Object.entries(dataArr?.allData);
  console.log(data)
  //return (
  //  <div className='main-container'>
  //    {data.allData && data.map((value, key) => {
  //      console.log(value, key);
        
        //value.map((img, item) => {

        //})
      //})}
      {/*
        return (
          <div key={index}>
            <h2 className='category-title'>{cat.name}</h2>
            <div className='category-container'>
              {cat.images.map((img, item) => {
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
      })}*/}
    //</div>
  //);
}

export default ListFiles;
