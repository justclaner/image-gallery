import PropTypes from 'prop-types'
import {useContext} from 'react'
import {ImageContext} from '../App.jsx'
export function Image({img, name = "Sample Name", desc = "Sample Description.\nClick to edit!", id}) {
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
    onDrag={()=>{
        //search for image index in the list to allow correct switching of images
        let index = -1;
        for (let i = 0; i < imageContext.imageList.length; i++) {
            if (imageContext.imageList[i].props.id == id) {index = i; break;}
        }
        //set selected image index
        imageContext.setMoveIds([index,imageContext.moveIds[1]]);
        imageContext.setMoveImage({img,name,desc,id});
        imageContext.setDragEnded(false);
    }}
    //allow dropping without a drop target
    onDragOver={(e)=>{e.preventDefault();}}
    onDragEnter={(e)=>{e.preventDefault();}}
    onDrop={()=>{
        imageContext.setDragEnded(true)
        //search for image index in the list to allow correct switching of images
        let index = -1;
        for (let i = 0; i < imageContext.imageList.length; i++) {
            if (imageContext.imageList[i].props.id == id) {index = i; break;}
        }
        //set target image index
        imageContext.setMoveIds([imageContext.moveIds[0],index]);
    }}
    /> <br />
    <input type="text" className="image-name" defaultValue={name}/>
    <textarea defaultValue={desc} ></textarea>
    </div>
)
}

Image.propTypes = {
    src: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    id: PropTypes.number
}

export default Image;