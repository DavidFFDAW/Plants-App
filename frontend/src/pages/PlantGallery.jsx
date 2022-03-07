import { useEffect, useState } from "react";
import { apiURL, imagesURL } from "../constants/config";

export default function PlantsGallery() {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch(`${ apiURL }getImages.php`)
        .then(res => res.json())
        .then(res => { 
            setImages(res.images)
        });
    }, []);

    return (
        <>
            <div className="content-container">
                <h1 className="title-body block"><strong>Galería</strong> de plantas</h1>

                <div className="grid-images">
                    { images.map((image,ind) => (
                        <div className="down-little box-no-padding-total flex center" key={ind}>
                            <div>
                                <div className="flex center">
                                    <img src={image} alt="" width="220" height="240"/>
                                </div>
                                <p style={{ textAlign: 'center' }}>{ image.replace(imagesURL,'')}</p>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </>
    );
}