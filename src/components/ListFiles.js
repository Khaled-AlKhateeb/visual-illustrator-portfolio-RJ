import React from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { db, doc, getDoc } from '../firebaseConfig';

const ListFiles = () => {
  const dataArr = useSelector((state) => state.categoryData);
  //const allRef = doc(db, "Data", "allData");
  //const allSnap = await getDoc(allRef);
  //const allItem = allSnap.data();
  //const storedArray = dataArr.allImgs;
  console.log(dataArr);
  return (
    <div className='main-container'>
      {/*{data.map((value, key) => {
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
      })}*/}
    </div >
  );
}

export default ListFiles;
