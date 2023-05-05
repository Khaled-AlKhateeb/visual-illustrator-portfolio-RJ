function Image(props) {

  return (
    <img src={props.imageUrl} alt={props.imageName} className="artwork-image"></img>
  )
}

export default Image;