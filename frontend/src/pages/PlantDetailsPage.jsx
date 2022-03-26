import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ContentContainer } from "../components/ContentContainer";
import { LoadingComponent } from "../components/LoadingComponent";
import { TypeLabel } from "../components/TypeLabel";
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

    const downloadQR = (ev,qrCode) => {
        const link = document.createElement('a');
        ev.preventDefault();
        const blob = new Blob([qrCode], {type: 'image/*'});
        link.href = URL.createObjectURL(blob);
        link.download = `${plant.name}_qr_code.png`;
        link.click();
    }

    return (
        <>
            <ContentContainer title={plant.name.toUpperCase()} center="center" extraClass="content-container-plant-details">
                <div className="down box-no-padding-total plant-details">
                    
                    <img src={plant.image} alt={plant.name} className="plant-details-img" />

                    <TypeLabel type={plant.type}/>

                    <div className="down-little">
                        { plant.description }
                    </div>

                    <table style={{ width: '100%' }} className="down">
                        <thead>
                            <tr>
                                <th colSpan={2}>Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="key">ID</td>
                                <td>{ plant.id }</td>
                            </tr>
                            <tr>
                                <td className="key">Nombre</td>
                                <td>{ plant.name }</td>
                            </tr>
                            <tr>
                                <td className="key">Cantidad</td>
                                <td>{ plant.quantity }</td>
                            </tr>
                            <tr>
                                <td className="key">Locatiom</td>
                                <td>{ plant.location }</td>
                            </tr>
                            <tr>
                                <td className="key">Detalles de localización</td>
                                <td>{ plant.extra_location }</td>
                            </tr>
                            <tr>
                                <td className="key">Regado</td>
                                <td>{ plant.water_quantity + ' dias'}</td>
                            </tr>
                            <tr>
                                <td className="key">Ult vez regada</td>
                                <td>{ plant.last_time_watered || 'No regada' }</td>
                            </tr>
                            <tr>
                                <td className="key">Visitas</td>
                                <td>{ plant.visits }</td>
                            </tr>
                            <tr>
                                <td className="key">Creada</td>
                                <td>{ new Date(plant.created_at).toLocaleDateString('es') }</td>
                            </tr>
                            <tr>
                                {qr.shown && <td colSpan={2} style={{ textAlign: 'center' }}>
                                    <img src={ qr.code } alt={ plant.name + 'QR code'} />
                                </td> }
                            </tr>
                        </tbody>
                    </table>
                    
                    {/* <p>Nombre científico: {plant.real_name}</p>
                    <img src={ plant.image } width="100%" height="450" alt="" />
                    <p>ID de la planta: {plant.id}</p>
                    <p>Localización: {plant.location}</p>
                    <p>Detalles de localización: {plant.extra_location}</p>
                    <TypeLabel type={plant.type} />
                    <p style={{ width: '100%' }}>{plant.description}</p>
                    <p>Cantidad de esta planta: {plant.quantity}</p>
                    <p>Cada cuantos días requiere regado: {plant.water_quantity}</p>
                    <p>¿Cuando se regó por última vez?: {plant.last_time_watered}, es decir {plant.watered_days_ago} días...</p>
                    <p>Visitas de esta planta: {plant.visits}</p>
                    <p>Creada: {plant.created_at}</p> */}

                    {/* { qr.shown && <div className="flex center">
                        <img src={ qr.code } alt={ plant.name + 'QR code'} />
                    </div> } */}

                    <div className="flex center">
                        { !qr.shown && <button 
                            type="button" 
                            className={`down btn btn-secondary-static ${ qr.shown ? 'disabled' : '' }`}
                            onClick={() => checkQRCode(plant.id)}
                            disabled={qr.shown}                                
                        >Ver QR</button> }

                        {qr.shown && <button
                            type="button"
                            className="down btn btn-principal-static"
                            onClick={ev => downloadQR(ev,qr.code)}
                        >Descargar QR</button>}
                    </div>
                </div>
            </ContentContainer>
        </>
    );
}

