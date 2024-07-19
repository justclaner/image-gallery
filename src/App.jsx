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

//to-do set imageSelected to -1 after each deletion
const deleteImage = () => {
  setImageList(imageList.filter(obj=>obj.props.id!=imageSelected));
}

useEffect(()=>{
  //delete original moved
  console.log(moveIds);

 if(!dragEnded) {return;} //user has not dropped yet
 if(moveIds[0]==moveIds[1]) {console.log("exit");return;}
  //moveImage
  //not moveIds[1] fix this
  const newImageList1 = imageList.filter((img,index)=>index!=moveIds[0]);
  console.log("list1"); console.log(newImageList1);
  const newImageList2 = [
    ...newImageList1.slice(0,moveIds[1]),
    <ImageCard img={moveImage.img} name={moveImage.name} desc={moveImage.desc} id={moveImage.id} key={moveImage.id}></ImageCard>,
    ...newImageList1.slice(moveIds[1])
];
console.log("list2"); console.log(newImageList2);
console.log("moveImage");
console.log(moveImage);
console.log("")
  setImageList(newImageList2);
},[moveIds])

//useEffect(()=>{console.log(moveImage);},[moveImage])
//useEffect(()=>{})
  return (
    <ImageContext.Provider value={{imageSelected,setImageSelected,imageList,setImageList,moveIds,setMoveIds,setMoveImage, setDragEnded}}>
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

