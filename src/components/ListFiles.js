import React, { useEffect, useState } from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ListFiles = () => {
  const data = useSelector((state) => state.categoryData);
  const [storedArray, setStoredArray] = useState([]);

  useEffect(() => {
    const arr = [];
    data.names.map((cat) => {
      cat.images.map((img) => {
        arr.push(img);
        return null;
      });
      return null;
    })
    setStoredArray(arr);
  }, [data.names]);

  return (
    <div className='main-container'>
      {data.names.map((cat, index) => {
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
      })}
    </div>
  );
}

export default ListFiles;
