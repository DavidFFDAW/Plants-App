import { Link, useHistory } from "react-router-dom";
import { GiDrop } from "react-icons/gi";
import { ROUTES } from "../../constants/routes";
import { TypeLabel } from "../TypeLabel";

export function PlantCard ({ plant, placeholdImg, waterPlant, editButton }) {

    const h = useHistory();

    const redirectToPlant = id => {
        h.push(`${ROUTES.details}${ id }`);
    }

    return (
        <div className="box-no-padding-total plant-card" key={plant.id} style={{ padding: '30px 0 !important' }}>
                <div className="plant-card-image">
                    <img src={plant.image ? plant.image : placeholdImg} alt="" />
                    <h4 className="plant-card-info-item title" style={{ fontSize: '20px', textTransform: 'uppercase' }} onClick={ _ => redirectToPlant(plant.id) }>{plant.name}</h4>
                </div>
                { plant.watered_days_ago > 2 && <GiDrop className="water-drop" /> }
                { plant.quantity > 1 && <span className="plant-quantity">x<strong>{plant.quantity}</strong></span> }
                <div className="plant-card-info" style={{ position: 'relative', padding: '5px 20px' }}>
                    <h4 className="plant-card-info-item" style={{ margin: 0, marginTop: 15, marginBottom: 5, fontSize: '18px', textTransform: 'uppercase' }}>{plant.real_name}</h4>
                    <TypeLabel type={plant.type} />
                    <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.location}</p>
                    <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>Ultima vez regada: { plant.last_time_watered ? `Hace ${plant.watered_days_ago} días` : 'No regada' }</p>
                
                    { editButton && <Link to={`${ROUTES.update}${plant.id}`} className="btn btn-principal-static"><MdModeEdit style={{ fill: '#FFFFFF' }}/></Link> }
                    { /* <div className="down flex between">
                            <button className="btn btn-secondary" onClick={ _ => waterPlant(plant.id) }><GiDrop style={{ fill: '#468d4f' }} /> Regar</button>                           
                            <Link to={ `/plant/details/${ plant.id }` } className="btn btn-principal">Detalles</Link>
                            { editButton && <Link to={ `/admin/update/plants/${ plant.id }` } className="btn btn-principal">Editar</Link>                      
                    </div> */ } 
                </div>
        </div>
    );
}