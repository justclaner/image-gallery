import { useState, useRef, useEffect, useContext, createContext } from 'react'
import Gallery from './components/Gallery.jsx'
export const ImageContext = createContext(null);
import ImageCard from './components/ImageCard.jsx'
function App() {


const [imageList, setImageList] = useState([]);
const [imageSelected,setImageSelected] = useState(-1);


const imageUpload = useRef(null);

const imageSubmit = () => {
imageUpload.current.click();
}

const imageDisplay = () => {
  let fileReader = new FileReader();

  fileReader.onload = function() {
    const imgTest = new Image();
    imgTest.src = fileReader.result;
    imgTest.onload = () => {
      console.log(imgTest.width + " " + imgTest.height);
      let filename = imageUpload.current.files[imageUpload.current.files.length-1].name;
      let newImage = [0];
  
      setImageList([...imageList,...newImage.map(obj=> <ImageCard img={fileReader.result} name={filename} key={imageList.length} id={imageList.length}></ImageCard> )]);
    }



  }
  
  fileReader.readAsDataURL(imageUpload.current.files[imageUpload.current.files.length-1]);
  console.log(imageUpload.current.files);
}

const deleteImage = () => {
  setImageList(imageList.filter(obj=>obj.props.id!=imageSelected));
}


  return (
    <ImageContext.Provider value={{imageSelected,setImageSelected,imageList}}>
    <h1>Image Gallery Scroller</h1>
    <Gallery  getImageList={setImageList} imageList={imageList}/>
    <br />
    <button onClick={imageSubmit}>Upload Image</button> 
    <button onClick={deleteImage}>Delete</button> 
    <button>Clear All</button>
    <input type="file" accept="image/*" ref={imageUpload} onChange={imageDisplay} style={{display: "none"}} />
    </ImageContext.Provider>
  )
}

export default App;

