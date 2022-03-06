import { Link } from "react-router-dom";

export default function PlantList ({ plants, placeholdImg }) {
    return (
        <>
            <div className="down-little grid-images">
                { plants.map((plant) => (
                    <div className="box-no-padding-total plant-card" key={plant.id} style={{ padding: '30px 0 !important' }}>
                            <div className="plant-card-image">
                                <img src={plant.image ? plant.image : placeholdImg } alt=""/>
                            </div>
                            <div className="plant-card-info" style={{ padding: '5px 20px' }}>
                                <h4 className="plant-card-info-item" style={{ marginBottom:0, fontSize: '20px', textTransform: 'uppercase' }}>{plant.name}</h4>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.real_name}</p>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.location}</p>
                                <p className="plant-card-info-item" style={{ fontSize: '16px', margin: 0 }}>{plant.last_time_watered}</p>
                                <div className="down flex between">
                                        <button className="btn btn-secondary">Regar</button>                              
                                        <Link to={ `/plant/details/${ plant.id }` } className="btn btn-principal">Detalles</Link>                              
                                </div>
                            </div>
                    </div>                                                
                )) } 
            </div>
        </>
    );
}