import PropTypes from 'prop-types'
import {useState, useContext, useRef} from 'react'
import {ImageContext} from '../App.jsx'
export function Image({img, name = "Random Name", desc = "Random Description", id}) {
const imageContext = useContext(ImageContext);

return(
    <div className="image-container" id={id} 
    onClick={()=>{
        if(imageContext.imageSelected != id) {
        imageContext.setImageSelected(id);
        } else {
            imageContext.setImageSelected(-1);
        }
    }}
    style={{border: (imageContext.imageSelected == id )? "3px solid #ee6c4d" : "3px solid black"}}
        >
    <img src={img} id={id} style={imageContext.imageSelected == id ? {borderBottom: "3px solid #ee6c4d"} : {borderBottom: "3px solid black"}}
    draggable="true"
    onDrag={(event)=>{
        let index = -1;
        for (let i = 0; i < imageContext.imageList.length; i++) {
            if (imageContext.imageList[i].props.id == id) {index = i; break;}
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
            if (imageContext.imageList[i].props.id == id) {index = i; break;}
        }
        imageContext.setMoveIds([imageContext.moveIds[0],index]);
    }}
    /> <br />
    <input type="text" className="image-name" defaultValue={name}/>
    <textarea name="" defaultValue={desc} ></textarea>
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