import { useState, useRef, useEffect, useContext, createContext } from 'react'
import Gallery from './components/Gallery.jsx'
export const ImageContext = createContext(null);
import ImageCard from './components/ImageCard.jsx'
function App() {

const [imageList, setImageList] = useState([]);
const [imageSelected,setImageSelected] = useState(-1);
const [moveIds,setMoveIds] = useState([-1,-1]);
const [moveImage,setMoveImage] = useState(null);
const [dragEnded, setDragEnded] = useState(true);
const [popupClass, setPopupClass] = useState("popupText");
const popupDuration = 2;
document.querySelector(":root").style.setProperty("--popupDuration",`${popupDuration}s`);
const imageUpload = useRef(null);
const imageUploadPopup = useRef(null);


const imageSubmit = () => {
imageUpload.current.click();
}

const imageDisplay = () => {
  let fileReader = new FileReader();

  fileReader.onload = function() {
    const imgTest = new Image();
    imgTest.src = fileReader.result;
    imgTest.onload = () => {
      if(imgTest.width/imgTest.height < 0.5) {
        setPopupClass("popupText popupText-animation");
        setTimeout (()=>{
          setPopupClass("popupText");
        },popupDuration*1000);
        return;
        } 
   
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
  setImageSelected(-1);
}

const clearAll = () => {
  setImageList([]);
  setImageSelected(-1);
}

//move images around
useEffect(()=>{
 if(!dragEnded) {return;} //user has not dropped yet
 if(moveIds[0]==moveIds[1]) {return;} //user does not move an image elsewhere
  //moveImage
  const newImageList1 = imageList.filter((img,index)=>index!=moveIds[0]);
  const newImageList2 = [
    ...newImageList1.slice(0,moveIds[1]),
    <ImageCard img={moveImage.img} name={moveImage.name} desc={moveImage.desc} id={moveImage.id} key={moveImage.id}></ImageCard>,
    ...newImageList1.slice(moveIds[1])
];
  setImageList(newImageList2);
},[moveIds])


  return (
    <ImageContext.Provider value={{imageSelected,setImageSelected,imageList,setImageList,moveIds,setMoveIds,setMoveImage,dragEnded,setDragEnded}}>
    <h1>Image Gallery Scroller</h1>
    <Gallery  getImageList={setImageList} imageList={imageList} dragEnded={dragEnded}/>
    <br />
    <button onClick={imageSubmit}>Upload Image
      <span className={popupClass} ref={imageUploadPopup}>Image aspect ratio must be greater than 1:2</span>
      </button> 
    <button onClick={deleteImage}>Delete</button> 
    <button onClick={clearAll}>Clear All</button>
    <input type="file" accept="image/*" ref={imageUpload} onChange={imageDisplay} style={{display: "none"}} />
    <br />
    <p>Upload some images to get started!</p>
    </ImageContext.Provider>
  )
}

export default App;
