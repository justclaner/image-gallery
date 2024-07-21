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
const imageUpload = useRef(null);
const imageUploadPopup = useRef(null);
const popupDuration = 2;
document.querySelector(":root").style.setProperty("--popupDuration",`${popupDuration}s`);

//allows user to upload image
const imageSubmit = () => {
imageUpload.current.click();
}

//retrieves image file from user upload
const imageDisplay = () => {
  let fileReader = new FileReader();

  fileReader.onload = function() {
    const imgTest = new Image();
    imgTest.src = fileReader.result;

    //test to see if image aspect ratio is greater than 1:2 (input and textarea width would be too small if not)
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
      setImageList([...imageList,...newImage.map(obj=> <ImageCard img={fileReader.result} name={filename} key={imageList.length} id={imageList.length}></ImageCard>)]);
    }
  }
  fileReader.readAsDataURL(imageUpload.current.files[imageUpload.current.files.length-1]);

}

//allows user to delete a selected image
const deleteImage = () => {
  setImageList(imageList.filter(obj=>obj.props.id!=imageSelected));
  setImageSelected(-1); //makes sure to deselect after deletion
}

//allows user to delete all images
const clearAll = () => {
  setImageList([]);
  setImageSelected(-1);
}

//allows user to move images around
useEffect(()=>{
 if(!dragEnded) {return;} //user has not dropped yet
 if(moveIds[0]==moveIds[1]) {return;} //user does not move an image elsewhere
 
  //deletes image originally selected from imageList
  const newImageList1 = imageList.filter((img,index)=>index!=moveIds[0]);
  //places originally selected image at the index before/after the targeted image depending on direction
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
    <p className="instructions">Upload some images to get started! There are already some default images in the gallery that you could delete if you'd like. Images 
      initially uploaded will have their filename (as is on your PC) as the name and a sample description by default. You can click to edit both the name and description 
      of each image. Use your mouse scrollwheel to scroll left/right. To move images around, drag the images. To delete an image, first click on it to select it and then 
      click "Delete". Delete all images in the gallery by clicking "Clear All". There is no undo button.</p>
    </ImageContext.Provider>
  )
}

export default App;

