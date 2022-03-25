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
                    <p style={{ color: 'rgba(0,0,0,.3)', opacity: '.4' }}># Esto puede ir en una tabla #</p>
                    <p>Nombre científico: {plant.real_name}</p>
                    <img src={ plant.image } width="100%" height="450" alt="" />
                    <p>ID de la planta: {plant.id}</p>
                    <p>Localización: {plant.location}</p>
                    <p>Detalles de localización: {plant.extra_location}</p>
                    <p>TIpo: <span className={`plant-type-label ${plant.type}`}>{plant.type}</span></p>
                    <p style={{ width: '100%' }}>{plant.description}</p>
                    <p>Cantidad de esta planta: {plant.quantity}</p>
                    <p>Cada cuantos días requiere regado: {plant.water_quantity}</p>
                    <p>¿Cuando se regó por última vez?: {plant.last_time_watered}, es decir {plant.watered_days_ago} días...</p>
                    <p>Visitas de esta planta: {plant.visits}</p>
                    <p>Creada: {plant.created_at}</p>

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

