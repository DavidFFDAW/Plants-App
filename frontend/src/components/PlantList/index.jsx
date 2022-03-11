import { Link } from "react-router-dom";
import { GiDrop } from "react-icons/gi";
import { formatDate } from "../../services/date.services";

export default function PlantList({ plants, placeholdImg, waterPlant }) {

    return (
        <>
            <div className="down-little grid-images">
                { plants.map((plant) => (
                    <div className="box-no-padding-total plant-card" key={plant.id} style={{ padding: '30px 0 !important' }}>
                            <div className="plant-card-image">
                                <h4 className="plant-card-info-item title" style={{ fontSize: '20px', textTransform: 'uppercase' }}>{plant.name}</h4>
                                <img src={plant.image ? plant.image : placeholdImg} alt="" />
                            </div>
                            { plant.watered_days_ago > 2 && <GiDrop className="water-drop" /> }
                            <div className="plant-card-info" style={{ position: 'relative', padding: '5px 20px' }}>
                                <h4 className="plant-card-info-item" style={{ margin: 0, marginTop: 15, marginBottom: 5, fontSize: '18px', textTransform: 'uppercase' }}>{plant.real_name}</h4>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.location}</p>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>Ultima vez regada: { plant.last_time_watered ? `Hace ${plant.watered_days_ago} días` : 'No regada' }</p>
                            
                                <div className="down flex between">
                                        <button className="btn btn-secondary" onClick={ _ => waterPlant(plant.id) }><GiDrop style={{ fill: '#468d4f' }} /> Regar</button>                           
                                        <Link to={ `/plant/details/${ plant.id }` } className="btn btn-principal">Detalles</Link>                              
                                </div>
                            </div>
                    </div>                                                
                )) } 
            </div>
            <div className="flex between">
                <div></div>
                <div>
                    <button onClick={ _ => window.scrollTo({ top: 0, behavior: 'smooth' }) } className="btn btn-principal-static">Volver arriba</button>
                </div>
            </div>
        </>
    );
}