import { Link } from "react-router-dom";
import { GiDrop } from "react-icons/gi";
import { getDifferenceInDaysBetweenDates } from "../../services/date.services";
import { formatDate } from "../../services/date.services";

export default function PlantList({ plants, placeholdImg, waterPlant }) {

    return (
        <>
            <div className="down-little grid-images">
                { plants.map((plant) => (
                    <div className="box-no-padding-total plant-card" key={plant.id} style={{ padding: '30px 0 !important' }}>
                            <div className="plant-card-image">
                                <img src={plant.image ? plant.image : placeholdImg} alt="" />
                            </div>
                            { getDifferenceInDaysBetweenDates(plant.last_time_watered) > 4 && <GiDrop className="water-drop" /> }
                            <div className="plant-card-info" style={{ padding: '5px 20px' }}>
                                <h4 className="plant-card-info-item" style={{ marginBottom:0, fontSize: '20px', textTransform: 'uppercase' }}>{plant.name}</h4>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.real_name}</p>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.location}</p>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>Ultima vez regada: { plant.last_time_watered ? formatDate(plant.last_time_watered) : 'No regada' }</p>
                            
                                <div className="down flex between">
                                        <button className="btn btn-secondary" onClick={ _ => waterPlant(plant.id) }><GiDrop style={{ fill: '#468d4f' }} /> Regar</button>                           
                                        <Link to={ `/plant/details/${ plant.id }` } className="btn btn-principal">Detalles</Link>                              
                                </div>
                            </div>
                    </div>                                                
                )) } 
            </div>
        </>
    );
}