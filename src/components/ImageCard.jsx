import PropTypes from 'prop-types'
import {useState, useContext} from 'react'
import {ImageContext} from '../App.jsx'
function Image({img, name = "Random Name", desc = "Random Description", id}) {
const imageContext = useContext(ImageContext);


return(
    <div className="image-container" id={id}
    onClick={()=>{
        console.log(imageContext);
        imageContext.setImageSelected(id);
        console.log(imageContext.imageSelected);
    }}

    style={imageContext.imageSelected == id ? {border: "5px solid red"} : {border: "5px solid black"}}
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