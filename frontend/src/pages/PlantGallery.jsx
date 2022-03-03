import { useEffect, useState } from "react";

export default function PlantsGallery() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('http://146.59.159.40/plants_images/api/getImages.php')
        .then(res => res.json())
        .then(res => { 
            setImages(res.images)
        });
    }, []);

    return (
        <>
            <div className="content-container">
                <h1>Galería de plantas</h1>

                <div className="grid-images">
                    { images.map((image,ind) => (
                        <div className="down-little box-no-padding-total flex center" key={ind}>
                            <div>
                                <img src={image} alt="" width="220" height="240"/>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </>
    );
}