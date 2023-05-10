function Image(props) {
  return (
    <img src={props.imageUrl} alt={props.imageName} className={props.class}></img>
  )
}

export default Image;