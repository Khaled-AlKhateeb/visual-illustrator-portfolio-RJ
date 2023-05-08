import { useEffect, useState } from 'react';
import Image from './Image';
import { Link } from 'react-router-dom';

function ListFiles() {
  const [storedArray, setStoredArray] = useState([]);
  useEffect(() => {
    setStoredArray(JSON.parse(localStorage.getItem('Storage')));
  }, []);

  const categoryArr = [];

  storedArray.map((item, index) => {
    const parts = item.name.split('_');
    const title = parts[0].split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    if (!categoryArr.includes(title)) {
      categoryArr.push(title);
    }
    storedArray[index].category = categoryArr.indexOf(title);
    return null;
  })

  return (
    <div className='main-container'>
      {categoryArr.map((cat, index) => {
        return (
          <div key={index}>
            <h2 className='category-title'>{cat}</h2>
            <div className='category-container'>
              {storedArray.map((img, item) => {
                if (img.category === index) {
                  return (
                    <Link
                      className='image-container'
                      to='/slider'
                      key={item}
                      state={{ name: img.name, array: storedArray }}
                    >
                      <Image imageUrl={img.url} imageName={img.name} />
                    </Link>
                  )
                }
                return null;
              })}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ListFiles;
