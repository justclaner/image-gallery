import Image from './ImageCard.jsx'
import {useRef, useEffect} from 'react';


function Gallery(props) {
    const initial = [
        {
            url:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg/1200px-Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg",
            name:"Mount Everest",
            desc:"The tallest mountain in the world with an elevation of 29,000 feet located in the Himalayas. Around 6.5% of climbers die while trying to reach the top."
        },
        {
            url:"https://www.niagarafallsstatepark.com/~/media/parks/niagara-falls/niagara-falls-state-park/photos-and-videos/photo-gallery-8.jpg",
            name:"Niagra Falls",
            desc:"A famous trio of waterfalls located on the border between New York and Ontario. Over the course of thousands of years, it will slowly erode to Lake Erie, where it will cease to exist."
        },
        {
            url:"https://i.natgeofe.com/k/c41b4f59-181c-4747-ad20-ef69987c8d59/eiffel-tower-night.jpg",
            name:"The Effiel Tower",
            desc:"A tall skyscraper in Paris that was once the tallest building built by man. It is one of the most popular tourist attractions in the world."
        },
        {
            url:"https://cdn.mos.cms.futurecdn.net/TWpr5dTCno77m2J2aFgLxD-1200-80.jpg",
            name:"Saturn",
            desc:"The sixth and second largest planet in the Solar System. It is named by the Romans and has ties with the Greek Goddess Cronus."
        },
        {
            url:"https://s3.amazonaws.com/cms.ipressroom.com/173/files/20234/6463d4762cfac278e4de37ac_Megalodon+illustration+Alex+Boersma+PNAS/Megalodon+illustration+Alex+Boersma+PNAS_af2c6cef-9f5d-4dc6-b307-1f18174f7181-prv.jpg",
            name:"Megalodon",
            desc:"An extinct species of sharks that lived 23 to 3.6 million years ago that died off from a shift in the food chain."
        },
        {
            url:"https://cdn.britannica.com/82/94382-050-20CF23DB/Great-Wall-of-China-Beijing.jpg",
            name:"The Great Wall of China",
            desc:"The longest structure built across centuries in ancient times to protect China from foreign invaders. It is so long that it can be seen from space."
        }
    ]

const initialImages = initial.map((obj,index)=><Image img={obj.url} name={obj.name} desc={obj.desc} key={index} id={index}></Image>);

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

