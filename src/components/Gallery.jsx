import Image from './ImageCard.jsx'
import {useState, useRef, useEffect} from 'react';


function Gallery(props) {



const initialUrls = ["https://pics.craiyon.com/2023-11-04/445a2f0ac518410fac24c2ae3980787b.webp","https://pbs.twimg.com/media/FO35aoHXMAIceaL.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg/1200px-Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg"];
const initialImages = initialUrls.map((url,index)=><Image img={url} name="Sample File Name" desc={"Sample Image Description.\nClick to edit!"} key={index} id={index}></Image>);



 const imageList = props.imageList;



const gallery = useRef(null);

const scroll = (event) => {
    gallery.current.scrollLeft += event.deltaY;
}






useEffect(()=>{
    props.getImageList([...initialImages]);
 },[])


    return(
        <div className="gallery" onWheel={scroll} ref={gallery}>
        {imageList}
        </div>
    );
}

export default Gallery;

