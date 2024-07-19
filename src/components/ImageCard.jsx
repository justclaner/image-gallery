import PropTypes from 'prop-types'
import {useState, useContext, useRef} from 'react'
import {ImageContext} from '../App.jsx'
export function Image({img, name = "Random Name", desc = "Random Description", id}) {
const imageContext = useContext(ImageContext);


return(
    <div className="image-container" id={id}
    onClick={()=>{
        console.log(imageContext);
        imageContext.setImageSelected(id);
        console.log(imageContext.imageSelected);
    }}
    draggable="true"
    style={imageContext.imageSelected == id ? {border: "5px solid red"} : {border: "5px solid black"}}
    onDrag={()=>{
        let index = -1;
        for (let i = 0; i < imageContext.imageList.length; i++) {
            if (imageContext.imageList[i].props.id == id) {index = i; console.log("index1 " + index); break;}
        }
        imageContext.setMoveIds([index,imageContext.moveIds[1]]);
        imageContext.setMoveImage({img,name,desc,id});
        imageContext.setDragEnded(false);
    }}
    onDragOver={(e)=>{e.preventDefault();}}
    onDragEnter={(e)=>{e.preventDefault();}}
    onDrop={()=>{
        imageContext.setDragEnded(true)
        let index = -1;
        for (let i = 0; i < imageContext.imageList.length; i++) {
            if (imageContext.imageList[i].props.id == id) {index = i; console.log("index2 " + index); break;}
        }
        imageContext.setMoveIds([imageContext.moveIds[0],index]);
    }}
    onDragEnd={()=>{console.log("ended"); }}
        >
    <img src={img} id={id} draggable="false" style={imageContext.imageSelected == id ? {borderBottom: "3px solid red"} : {borderBottom: "3px solid black"}}/> 
    <p className="image-name">{name.length > 30 ? name.slice(0,25) + "..." + name.slice(-4) : name}</p>
    <textarea name="" defaultValue={desc}></textarea>
    </div>
)
}

Image.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    id: PropTypes.number,
    selected: PropTypes.number
}

export default Image;