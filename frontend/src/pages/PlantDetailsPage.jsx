import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PlantDetailsPage() {
    const param = useParams();
    const urlLoc = useLocation();

    const [ plant, setPlant ] = useState({});
    const [ qr, setQR ] = useState({ shown: false });
    
    useEffect(() => {
        fetch(`http://vps-f87b433e.vps.ovh.net/plants_images/api/getPlants.php?id=${param.id}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if ( res.error ) {
                alert(res.message);
                return 0;
            }
            setPlant(res.plant);
        })
    },[ param ]);

    const checkQRCode = (id) => {
        const url = `http://vps-f87b433e.vps.ovh.net/plants_images/api/qr.php?id=${id}&url=${urlLoc.pathname}`;
        console.log('url: ',url);
        fetch(url).then(res => res.json())
        .then(res => {
            console.log('response');
            console.log(res);
            if ( res.error ) {
                alert(res.message);
                return 0;
            }
            setQR({
                shown: true,
                code: res.qr
            });
            console.log('qr response');
            console.log(qr);
        });
    }


    return (
        <>
            <div className="flex center">
                <div className="content-container">
                    <div className="">
                        <div className="col-12">
                            <h1>{ plant.name }</h1>
                            <p>{plant.real_name}</p>
                            <img src={ plant.image } width="100%" height="450" alt="" />
                            <p>{plant.id}</p>
                            <p>{plant.location}</p>
                            <p>{plant.type}</p>
                            <p style={{ width: 400 }}>{plant.description}</p>
                            <p>{plant.created_at}</p>

                            { qr.shown && <div className="flex center">
                                <img src={ qr.code } alt={ plant.name + 'QR code'} />
                            </div> }

                            <button 
                                type="button" 
                                className="down btn btn-secondary"
                                onClick={() => checkQRCode(plant.id) }
                            >Ver QR</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

