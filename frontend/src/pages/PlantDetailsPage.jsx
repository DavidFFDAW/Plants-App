import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ContentContainer } from "../components/ContentContainer";
import { LoadingComponent } from "../components/LoadingComponent";
import { apiURL } from "../constants/config";

export default function PlantDetailsPage() {
    const { id } = useParams();
    const urlLoc = useLocation();

    const [ plant, setPlant ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ qr, setQR ] = useState({ shown: false });
    
    useEffect(() => {
        fetch(`${ apiURL }getPlants.php?id=${ id }`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if ( res.error ) {
                alert(res.message);
                return 0;
            }
            setPlant(res.plant);
            setLoading(false);
        })
    },[ id ]);
    
    if ( loading ) {
        return <LoadingComponent type='spokes'/>
    }

    const checkQRCode = (id) => {
        const url = `${ apiURL }qr.php?id=${id}&url=${ urlLoc.pathname }`;
        console.log('url: ',url);
        fetch(url).then(res => res.json())
        .then(res => {
            if ( res.error ) {
                alert(res.code+':  '+res.message);
                return 0;
            }
            setQR({
                shown: true,
                code: res.qr
            });
        });
    }  

    return (
        <>
            <ContentContainer title={plant.name} center="center" extraClass="content-container-plant-details">
                <div className="down box-no-padding-total plant-details">
                    <p>{plant.real_name}</p>
                    <img src={ plant.image } width="100%" height="450" alt="" />
                    <p>{plant.id}</p>
                    <p>{plant.location}</p>
                    <p>{plant.type}</p>
                    <p style={{ width: '100%' }}>{plant.description}</p>
                    <p>{plant.created_at}</p>

                    { qr.shown && <div className="flex center">
                        <img src={ qr.code } alt={ plant.name + 'QR code'} />
                    </div> }

                    <button 
                        type="button" 
                        className={`down btn btn-secondary-static ${ qr.shown ? 'disabled' : '' }`}
                        onClick={() => checkQRCode(plant.id)}
                        disabled={qr.shown}                                
                    >Ver QR</button>

                    {qr.shown && <button
                        type="button"
                        className="down btn btn-principal-static"
                    >Descargar QR</button>}
                </div>
            </ContentContainer>
        </>
    );
}

